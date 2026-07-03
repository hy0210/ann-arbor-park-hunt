<template>
  <div id="app">
    <div class="header">
      <h1>🎮 Ann Arbor Park Hunt</h1>
      <div v-if="userLocation" class="location-info">
        <p>📍 您的位置: {{ userLocation.lat.toFixed(4) }}, {{ userLocation.lng.toFixed(4) }}</p>
        <p v-if="currentPark" class="in-park">✅ 您在公園範圍內: <strong>{{ currentPark.name }}</strong></p>
        <p v-else class="not-in-park">❌ 不在任何公園範圍內</p>
      </div>
      <div v-else class="location-info">
        <p>📍 等待位置資訊...</p>
        <button @click="requestLocation" class="btn">重新請求位置</button>
      </div>
    </div>

    <div id="map" ref="mapContainer"></div>

    <div class="nearby-parks">
      <h3>附近公園</h3>
      <ul>
        <li v-for="park in nearbyParks" :key="park.id" :class="{ active: park.id === currentPark?.id }">
          <span class="distance">{{ park.distance.toFixed(0) }}m</span>
          <span class="name">{{ park.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { parks } from './data/parks';
import { getDistance, isInsidePark } from './utils/distance';

// 創建自定義用戶位置圖標
const createUserIcon = () => {
  return L.divIcon({
    html: `<div style="
      width: 30px;
      height: 30px;
      background: #e74c3c;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 0 0 2px #e74c3c;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        width: 6px;
        height: 6px;
        background: white;
        border-radius: 50%;
      "></div>
    </div>`,
    className: 'user-marker-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
  });
};

export default {
  name: 'App',
  setup() {
    const mapContainer = ref(null);
    const map = ref(null);
    const userLocation = ref(null);
    const currentPark = ref(null);
    const watchId = ref(null);

    const nearbyParks = computed(() => {
      if (!userLocation.value) return [];

      const parksWithDistance = parks.map(park => ({
        ...park,
        distance: getDistance(
          userLocation.value.lat,
          userLocation.value.lng,
          park.lat,
          park.lng
        )
      }));

      return parksWithDistance
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5);
    });

    // 初始化地圖
    const initMap = (lat, lng) => {
      if (map.value) return;

      map.value = L.map(mapContainer.value).setView([lat, lng], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map.value);

      // 添加用戶位置標記
      updateUserMarker(lat, lng);

      // 添加公園標記
      parks.forEach(park => {
        const marker = L.circleMarker([park.lat, park.lng], {
          radius: 8,
          fillColor: '#3498db',
          color: '#2980b9',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8
        }).addTo(map.value);

        // 公園範圍圓形
        L.circle([park.lat, park.lng], {
          radius: park.radius,
          color: '#3498db',
          fillOpacity: 0.1,
          weight: 1
        }).addTo(map.value);

        marker.bindPopup(`<strong>${park.name}</strong><br>半徑: ${park.radius}m`);
      });
    };

    // 更新用戶位置標記
    const updateUserMarker = (lat, lng) => {
      if (map.value) {
        // 清除舊標記
        map.value.eachLayer(layer => {
          if (layer instanceof L.Marker && layer.options.className === 'user-marker') {
            map.value.removeLayer(layer);
          }
        });

        // 添加新標記
        const userMarker = L.marker([lat, lng], {
          icon: createUserIcon(),
          className: 'user-marker'
        }).addTo(map.value);
        userMarker.bindPopup('您的位置');

        // 中心到用戶位置
        map.value.setView([lat, lng], 13);
      }
    };

    // 請求用戶位置
    const requestLocation = () => {
      if (!navigator.geolocation) {
        alert('您的瀏覽器不支持地理定位');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          userLocation.value = { lat: latitude, lng: longitude };

          if (!map.value) {
            initMap(latitude, longitude);
          } else {
            updateUserMarker(latitude, longitude);
          }

          // 檢查是否在公園範圍內
          checkParkProximity(latitude, longitude);
        },
        (error) => {
          console.error('位置獲取失敗:', error);
          alert('無法獲取位置。請檢查權限設置。');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    };

    // 檢查是否在公園範圍內
    const checkParkProximity = (lat, lng) => {
      currentPark.value = null;

      for (const park of parks) {
        if (isInsidePark(lat, lng, park.lat, park.lng, park.radius)) {
          currentPark.value = park;
          break;
        }
      }
    };

    // 監聽用戶位置變化
    watch(userLocation, (newLocation) => {
      if (newLocation) {
        checkParkProximity(newLocation.lat, newLocation.lng);
      }
    });

    // 組件加載時請求位置
    onMounted(() => {
      requestLocation();

      // 如果支持，持續監控位置變化
      if (navigator.geolocation) {
        watchId.value = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            userLocation.value = { lat: latitude, lng: longitude };
            updateUserMarker(latitude, longitude);
            checkParkProximity(latitude, longitude);
          },
          null,
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 1000
          }
        );
      }
    });

    return {
      mapContainer,
      userLocation,
      currentPark,
      nearbyParks,
      requestLocation
    };
  }
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.header h1 {
  margin: 0 0 12px 0;
  font-size: 24px;
}

.location-info {
  font-size: 14px;
  line-height: 1.6;
}

.location-info p {
  margin: 4px 0;
}

.in-park {
  color: #2ecc71;
  font-weight: bold;
}

.not-in-park {
  color: #e74c3c;
  font-weight: bold;
}

.btn {
  margin-top: 8px;
  padding: 8px 16px;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn:hover {
  background: #f5f5f5;
}

#map {
  flex: 1;
  position: relative;
}

.nearby-parks {
  background: white;
  border-top: 1px solid #ddd;
  padding: 12px;
  max-height: 200px;
  overflow-y: auto;
}

.nearby-parks h3 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #333;
}

.nearby-parks ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nearby-parks li {
  padding: 8px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.nearby-parks li.active {
  background: #e8f5e9;
  font-weight: bold;
}

.distance {
  background: #667eea;
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
  min-width: 45px;
  text-align: center;
  font-size: 12px;
}

.name {
  flex: 1;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 20px;
  }

  .nearby-parks {
    max-height: 150px;
  }
}
</style>

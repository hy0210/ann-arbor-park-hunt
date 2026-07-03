// Haversine 公式計算兩點之間的距離（米）
export function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // 地球半徑（米）
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 判斷是否在公園範圍內
export function isInsidePark(userLat, userLng, parkLat, parkLng, radius) {
  const distance = getDistance(userLat, userLng, parkLat, parkLng);
  return distance <= radius;
}

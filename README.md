# 🎮 安娜堡公園尋訪遊戲

一款受寶可夢傳說 Arceus 啟發的地點基礎行動網路遊戲。探索並訪問安娜堡的公園來集點！

**MVP 狀態**：地理定位追蹤 + 地圖顯示 + 公園接近度檢測

🌐 **線上示範**：[ann-arbor-park-hunt.vercel.app](https://ann-arbor-park-hunt.vercel.app)

## 📱 功能特性

- **即時 GPS 追蹤** — 自動偵測您的位置
- **互動式地圖** — 使用 Leaflet 和 OpenStreetMap 建置
- **公園檢測** — 當您進入公園區域時顯示視覺回饋
- **附近公園列表** — 顯示距離最近的 5 個公園和距離
- **手機友善** — 針對手機最佳化的響應式設計

## 🚀 快速開始

### 需求條件
- Node.js 16+
- npm 或 yarn

### 安裝與執行

```bash
npm install
npm run dev
```

在瀏覽器中開啟 [http://localhost:5173](http://localhost:5173)。

### 建置生產版本

```bash
npm run build
```

## 🗺️ 包含的公園

MVP 包含安娜堡的 10 個真實公園：
- Gallup Park（葛洛普公園）
- Burns Park（伯恩斯公園）
- Nichols Arboretum（尼柯爾樹木園）
- Matthaei Botanical Gardens（馬泰植物園）
- Hudson Mills Metropark（哈德遜磨坊都會公園）
- Riverside Park（河邊公園）
- Buhr Park（伯爾公園）
- Slaughter Pen Mountain Bike Park（屠宰場山地自行車公園）
- Traverwood Park（特拉弗伍德公園）
- Furstenberg Park（弗斯滕伯格公園）

*注：座標為 MVP 測試的近似值。可使用真實 OpenStreetMap 資料更新。*

## 🛠️ 技術堆疊

- **Vue 3** — 前端框架
- **Leaflet** — 地圖庫
- **Vite** — 建置工具
- **Vercel** — 主機與部署

## 📂 專案結構

```
src/
├── App.vue              # 包含地圖和地理定位的主應用元件
├── data/
│   └── parks.js         # 公園位置和中繼資料
├── utils/
│   └── distance.js      # 距離計算（Haversine 公式）
├── main.js
└── style.css
```

## 🎯 已實現的 MVP 功能

- ✅ 地理定位 API 整合
- ✅ Leaflet 地圖顯示
- ✅ 即時位置追蹤
- ✅ 公園接近度檢測
- ✅ 距離計算
- ✅ 手機響應式 UI

## 🚧 未來功能（MVP 後）

- 集點系統（勾選已訪問的公園）
- 排行榜
- 公園資訊卡片（照片、描述）
- 成就徽章
- 社交分享
- 離線支援
- 音效和動畫

## 📝 開發

### 啟動開發伺服器
```bash
npm run dev
```

### 執行建置
```bash
npm run build
```

### 預覽生產版本
```bash
npm run preview
```

## 🚀 部署

在 Vercel 上部署，具有來自 GitHub 的自動 CI/CD。

要部署您自己的分叉：
1. 推送至 GitHub
2. 將倉庫連接到 Vercel
3. 自動部署

## 📄 授權

MIT

## 🤝 貢獻

歡迎意見回饋和建議！這是用於測試核心概念的原型。

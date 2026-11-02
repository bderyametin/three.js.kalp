# Three.js 3D Dönen Pembe Kalp

Bu proje, Three.js kullanılarak geliştirilmiş, ekranda kendi ekseni etrafında pürüzsüzce dönen bir **3D Pembe Kalp** sahnesidir.

---

## 🌟 Özellikler

- **3D Hacimli Kalp Geometrisi**: Pürüzsüz Bezier eğrileri ve yuvarlatılmış pah (`ExtrudeGeometry` + `bevel`) ile oluşturulmuş estetik 3D kalp formu.
- **Fiziksel Tabanlı Pembe Materyal (PBR)**: `MeshPhysicalMaterial` ile canlı pembe ton, parlak cila (`clearcoat`) ve ipeksi yüzey ışıltısı (`sheen`).
- **3 Noktalı Stüdyo Aydınlatması**: Ortam ışığı (Ambient), yönlü ana ışık (Key Light), gökyüzü dolgu ışığı (Fill Light) ve arka/kenar vurgusu (Rim Light).
- **Kamera Kontrolleri (OrbitControls)**: Fare veya dokunmatik ekran ile kalbi 360 derece döndürerek inceleme imkanı.
- **Duyarlı Tasarım (Responsive)**: Tüm ekran boyutlarına ve pencere değişimlerine otomatik uyum sağlayan renderer.

---

## 🚀 Çalıştırma

Projeyi yerel sunucuda çalıştırmak için:

```bash
# Geliştirme sunucusunu başlatın:
npm run dev
```

Tarayıcınızda açın:
```
http://localhost:5173/
```

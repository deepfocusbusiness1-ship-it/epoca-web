import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('public/images/epoca');
const namedDir = path.resolve('public/images/epoca/named');
if (!fs.existsSync(namedDir)) {
  fs.mkdirSync(namedDir, { recursive: true });
}

// Map key extracted files to semantic names
const mappings = {
  // Campaign & Banners
  'epoca_asset_1_r1_c0.webp': 'hero-invierno-2026.webp', // Man in tailored grey suit at Paris cafe "Época Invierno 2026"
  'epoca_asset_0_r0_c1.webp': 'hero-epoca-indumentaria.webp', // Época Indumentaria tailored dark suit & tie
  'epoca_asset_0_r1_c1.webp': 'hero-perramus-mujer.webp', // Perramus Mujer trench coat & silk scarf
  'epoca_asset_4_r1_c3.webp': 'hero-arquitectura-boutique.webp', // Iconic historic architecture building
  'epoca_asset_0_r0_c2.webp': 'editorial-outfit-hombre.webp', // "Te ayudamos a elegir tu outfit para cada ocasión"
  'epoca_asset_0_r1_c3.webp': 'editorial-boutique-interiores.webp', // Warm boutique interior with chandelier and apparel
  'epoca_asset_0_r1_c2.webp': 'editorial-san-martin-1718.webp', // "Época Bulevar se traslada - San Martín 1718"
  'epoca_asset_4_r0_c1.webp': 'brand-logo-card.webp', // ÉPOCA INDUMENTARIA black brand card
  
  // Men's Products
  'epoca_asset_2_r1_c0.webp': 'product-saco-sastrero-taupe.webp', // Man in taupe tailored blazer & blue shirt
  'epoca_asset_2_r1_c1.webp': 'product-saco-lino-cuadros.webp', // Man in glen check linen jacket with espresso
  'epoca_asset_1_r0_c0.webp': 'product-camisas-vestir-coleccion.webp', // Premium checked dress shirts with tags
  'epoca_asset_2_r0_c3.webp': 'product-blazer-casual-marino.webp', // Man standing in boutique with blazer and chinos
  'epoca_asset_1_r1_c3.webp': 'product-ambo-formal-charcoal.webp', // Tailored charcoal ambo with white tee & pocket square
  
  // Women's Products
  'epoca_asset_1_r1_c1.webp': 'product-conjunto-lino-oliva.webp', // Woman in sage green relaxed linen shirt & trousers
  'epoca_asset_1_r1_c2.webp': 'product-camisa-broderie-blanca.webp', // Woman in embroidered white broderie luxury shirt
  'epoca_asset_2_r0_c0.webp': 'product-campera-beige-urbana.webp', // Woman in beige cropped safari jacket & cap
  'epoca_asset_2_r0_c1.webp': 'product-camisa-rayas-pantalon-blanco.webp', // Woman in striped boyfriend shirt & white trousers
  'epoca_asset_2_r0_c2.webp': 'product-bermuda-lino-camisa.webp', // Woman in olive linen shorts and white crisp shirt
  'epoca_asset_2_r1_c2.webp': 'product-vestido-estampado-botanico.webp', // Woman in organic earth print shift dress
  'epoca_asset_3_r0_c1.webp': 'product-blusa-calada-menta.webp', // Woman in pastel mint broderie puff sleeve top
  'epoca_asset_3_r0_c2.webp': 'product-pantalon-sastrero-capri.webp', // Woman seated in boutique with cropped trousers
  'epoca_asset_3_r0_c3.webp': 'product-chaleco-sastrero-beige.webp', // Woman in beige tailored waistcoat & button details
  'epoca_asset_3_r1_c1.webp': 'product-campera-corderoy-arena.webp', // Woman in sand corduroy overshirt & cap
  'epoca_asset_4_r0_c0.webp': 'product-top-seda-lencero-blanco.webp', // Pure white silk & lace camisole
  'epoca_asset_4_r1_c0.webp': 'product-top-seda-lencero-lima.webp', // Silk & delicate lace slip top in vibrant lime
  'epoca_asset_3_r1_c3.webp': 'product-trench-perramus-verde.webp', // Woman holding emerald umbrella in Perramus trench
  
  // Footwear & Accessories
  'epoca_asset_4_r0_c2.webp': 'product-sneakers-cuero-artesanal.webp', // Handcrafted rich brown leather sneakers
  'epoca_asset_4_r1_c1.webp': 'product-cinturon-cuero-trenzado.webp', // Italian inspired striped webbing & leather belt
  'epoca_asset_4_r1_c2.webp': 'product-trench-perramus-impermeable.webp', // Perramus weatherproof outerwear folds
  'epoca_asset_2_r1_c3.webp': 'product-gorra-gabardina-bordada.webp', // Embroidered luxury twill cap on folded knitwear
  'epoca_asset_0_r1_c0.webp': 'product-botas-chelsea-cuero.webp', // Hand-burnished cognac Chelsea leather boots
  
  // Editorial & Lifestyle
  'epoca_asset_3_r0_c0.webp': 'lifestyle-bicicleta-decorativa.webp', // Boutique interior art & vintage bicycle
  'epoca_asset_3_r1_c0.webp': 'promo-descuento-magistrados.webp', // 20% OFF announcement card
  'epoca_asset_0_r0_c0.webp': 'grid-perramus-collection.webp', // 40% OFF Perramus 4-tile collection
};

for (const [src, dest] of Object.entries(mappings)) {
  const srcPath = path.join(srcDir, src);
  const destPath = path.join(namedDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${src} -> ${dest}`);
  }
}

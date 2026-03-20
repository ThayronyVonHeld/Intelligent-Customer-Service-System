<template>
  <div class="home-wrapper">
    <header class="hero-section">
      <h1>Olá, {{ userName }} 👋</h1>
      <p>Explore nossos tratamentos fisioterapêuticos especializados</p>
    </header>

    <div class="main-carousel-area">
      
      <button class="nav-control prev" @click="rotate(1)">❮</button>
      
      <div class="scene">
        <div class="carousel" :style="carouselStyle">
          <div 
            v-for="(item, index) in services" 
            :key="index" 
            class="carousel-item"
            :style="itemStyle(index)"
          >
            <div class="card-inner">
              <img :src="item.img" :alt="item.title" class="service-img">
              
              <div class="card-text">
                <h3>{{ item.title }}</h3>
                <hr class="card-divider" />
                <p class="service-desc">{{ item.desc }}</p>
                <p class="service-detail">{{ item.detail }}</p>
              </div>

              <button class="more-info">Ver detalhes</button>
            </div>
          </div>
        </div>
      </div>

      <button class="nav-control next" @click="rotate(-1)">❯</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const userName = ref("Paciente"); 
const currentRotation = ref(0);

const services = [
  { 
    title: 'RPG', 
    desc: 'Reeducação Postural Global.',
    detail: 'Alinhamento da coluna e correção de vícios posturais.',
    img: 'https://images.pexels.com/photos/4506168/pexels-photo-4506168.jpeg?_gl=1*13fnjju*_ga*MjA2ODIxODU1OS4xNzczOTgyODY1*_ga_8JE65Q40S6*czE3NzM5ODI4NjUkbzEkZzEkdDE3NzM5ODMwNTgkajYwJGwwJGgw' 
  },
  { 
    title: 'Pilates', 
    desc: 'Equilíbrio, força e flexibilidade.',
    detail: 'Fortalecimento do core e melhora da respiração.',
    img: 'https://images.pexels.com/photos/6111613/pexels-photo-6111613.jpeg?_gl=1*ic0pte*_ga*MjA2ODIxODU1OS4xNzczOTgyODY1*_ga_8JE65Q40S6*czE3NzM5ODI4NjUkbzEkZzEkdDE3NzM5ODQ0NTgkajU5JGwwJGgw' 
  },
  { 
    title: 'Acupuntura', 
    desc: 'Medicina tradicional para equilíbrio energético.',
    detail: 'Alívio de dores agudas e crônicas com agulhas.',
    img: 'https://images.pexels.com/photos/6076105/pexels-photo-6076105.jpeg?_gl=1*1ju8vq0*_ga*MjA2ODIxODU1OS4xNzczOTgyODY1*_ga_8JE65Q40S6*czE3NzM5ODI4NjUkbzEkZzEkdDE3NzM5ODU0MTIkajU5JGwwJGgw' 
  },
  { 
    title: 'Cinesioterapia', 
    desc: 'Terapia baseada no movimento.',
    detail: 'Recuperação funcional e aumento da amplitude muscular.',
    img: 'https://images.pexels.com/photos/8436444/pexels-photo-8436444.jpeg?_gl=1*aun5sy*_ga*MjA2ODIxODU1OS4xNzczOTgyODY1*_ga_8JE65Q40S6*czE3NzM5ODI4NjUkbzEkZzEkdDE3NzM5ODU1MjUkajkkbDAkaDA' 
  },
  { 
    title: 'Eletroterapia', 
    desc: 'Correntes elétricas para reabilitação.',
    detail: 'Alívio da dor e estímulo à contração muscular.',
    img: 'https://images.pexels.com/photos/30483032/pexels-photo-30483032.jpeg?_gl=1*1y6vjdi*_ga*MjA2ODIxODU1OS4xNzczOTgyODY1*_ga_8JE65Q40S6*czE3NzM5ODI4NjUkbzEkZzEkdDE3NzM5ODI4OTckajI4JGwwJGgw' 
  }
];

const rotate = (direction) => {
  currentRotation.value += direction * (360 / services.length);
};

const carouselStyle = computed(() => ({
  
  transform: `translateZ(-350px) rotateY(${currentRotation.value}deg)`
}));

const itemStyle = (index) => {
  
  const angle = index * (360 / services.length);
  const normalizedRotation = ((currentRotation.value % 360) + 360) % 360;
  const itemAngle = (angle + normalizedRotation) % 360;

  const isCenter = itemAngle < 10 || itemAngle > 350;

  return {
    transform: `rotateY(${angle}deg) translateZ(350px) scale(${isCenter ? 1 : 0.8})`,
    opacity: isCenter ? 1 : 0.6, 
    transition: 'all 0.8s ease'
  };
};
</script>

<style scoped>
.home-wrapper {
  padding: 40px;
  perspective: 1200px;
  width: 100%;
  min-height: calc(100vh - 80px); 
}

.hero-section {
  text-align: center;
  margin-bottom: 60px;
}

.hero-section h1 { color: #0077b6; font-size: 2.2rem; }
.hero-section p { color: #666; margin-top: 10px; }


.main-carousel-area {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1000px; 
  margin: 0 auto; 
  position: relative;
}

.scene {
  width: 320px; 
  height: 480px; 
  position: relative;
  transform-style: preserve-3d;
  margin: 0 40px;
}

.carousel {
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.carousel-item {
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 25px; 
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
}

.card-inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  height: 100%;
  padding: 0; 
}


.service-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  
  mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
}

.card-text {
  padding: 20px;
  flex-grow: 1;
  text-align: center;
}

.card-text h3 {
  color: #0077b6;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.card-divider {
  border: 0;
  border-top: 1px solid #eee;
  margin: 10px 0 15px 0;
}

.service-desc {
  font-weight: bold;
  color: #444;
  font-size: 0.95rem;
  margin-bottom: 8px;
  text-align: center;
}

.service-detail {
  font-size: 0.85rem;
  color: #777;
  line-height: 1.5;
}

.btn-container {
  padding-bottom: 25px;
  display: flex;
  justify-content: center;
}

.more-info {
   background: transparent;
  color: #00b4d8;
  border: 2px solid #00b4d8;
  padding: 8px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: 0.3s;
}

.more-info:hover {
   background: #00b4d8;
  color: white;
}

.nav-control {
  background: white;
  color: #0077b6;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  z-index: 100;
  font-size: 1.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.nav-control:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
}

.nav-control:active {
  transform: scale(0.95);
}

</style>
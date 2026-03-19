<template>
  <div class="home">

    <nav class="navbar">
      <h2 class="logo">Dra. Maggessy</h2>

      <div class="links">
        <span>Home</span>
        <span @click="$emit('goRegister')">Cadastrar-se</span>
        <span @click="$emit('goLogin')">Login</span>
      </div>
    </nav>

    <section class="hero">
      <h1>A fisioterapia transforma vidas</h1>
      <p>
        Cuidado, atenção e profissionalismo para sua recuperação e bem-estar.
      </p>

      <button @click="$emit('goRegister')">
        Marque já sua consulta
      </button>
    </section>

    <section class="info">
      <div class="card">
        <h3>Experiência</h3>
        <p>Clara, fisioterapeuta com anos de experiência em cuidados clínicos.</p>
      </div>

      <div class="card">
        <h3>Atendimento Humanizado</h3>
        <p>Cada paciente é tratado de forma única e personalizada.</p>
      </div>

      <div class="card">
        <h3>Resultados</h3>
        <p>Foco total na sua recuperação e qualidade de vida.</p>
      </div>
    </section>

  </div>
</template>

<style scoped>


.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #a8e6ff, #b9fbc0);
  color: #1d3557;
}


.navbar {
  display: flex;
  justify-content: space-between;
  padding: 20px 50px;
  background: white;
}

.logo {
  color: #0077b6;
}

.links span {
  margin-left: 20px;
  cursor: pointer;
  font-weight: bold;
}

.links span:hover {
  color: #00b4d8;
}


.hero {
  text-align: center;
  margin-top: 100px;
}

.hero h1 {
  font-size: 40px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 18px;
  margin-bottom: 30px;
}

.hero button {
  padding: 15px 30px;
  border: none;
  border-radius: 10px;

  background: linear-gradient(135deg, #00b4d8, #80ed99);
  color: white;
  font-weight: bold;

  cursor: pointer;
}


.info {
  display: flex;
  justify-content: center;
  margin-top: 80px;
  gap: 30px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 15px;
  width: 250px;
  text-align: center;

  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

</style>
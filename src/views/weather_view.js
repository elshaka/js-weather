class WeatherView {
  constructor(selector) {
    const node = document.querySelector(selector);
    node.innerHTML = this.html();
    this.header = node.querySelector('h1');

    this.updateListener = (weather, data) => {
      this.header.innerHTML = `${weather.location}: ${data}`
    };
  }

  html() {
    return `
      <div class="container">
        <h1>El clima!</h1>
      </div>
      `;
  }
}

export default WeatherView;

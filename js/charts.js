// Obtienes el canvas donde se va a dibujar el gráfico y obtienes el contexto sobre el que se va a trabajar.
const ctxDonutChart = document.getElementById('donutChartContainer').getContext('2d');
const ctxPostByUserChart = document.getElementById('postsByUserChartContainer').getContext('2d');
const ctxBarChart = document.getElementById('barChartContainer').getContext('2d');
const ctxStackedChart = document.getElementById('stackedChartContainer').getContext('2d');

const donutChart = new Chart(ctxDonutChart, {
    type: 'doughnut',
    data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1,
            hoverOffset: 4
        }]
    }
});

const barChart = new Chart(ctxBarChart, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
            label: '# of Votes 2021',
            data: [12, 19, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1,
            hoverOffset: 4
        }, {
            label: '# of Votes 2022',
            data: [19, 5, 2],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1,
            hoverOffset: 4
        }]
    }
});

const stackedChart = new Chart(ctxStackedChart, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
            {
                label: '# of Votes 2021',
                data: [12, 19, 3],
                backgroundColor: 'rgba(60,141,188,0.9)',
                borderColor: 'rgba(60,141,188,0.8)',
                pointRadius: false,
                pointColor: '#3b8bba',
                pointStrokeColor: 'rgba(60,141,188,1)',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(60,141,188,1)',
            },
            {
                label: '# of Votes 2022',
                data: [19, 5, 2],
                backgroundColor: 'rgba(210, 214, 222, 1)',
                borderColor: 'rgba(210, 214, 222, 1)',
                pointRadius: false,
                pointColor: 'rgba(210, 214, 222, 1)',
                pointStrokeColor: '#c1c7d1',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)'
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true
            }
        }
    }
});

fetch('https://jsonplaceholder.typicode.com/posts').then(function (response) {
    return response.json();
}).then(function (data) {
    let users = [];
    let countPostsByUser = [];
    let postsByUser = data.reduce(function (r, a) {

        if (users.indexOf(a.userId) === -1) {
            users.push(a.userId);
        }

        r[a.userId] = r[a.userId] || [];
        r[a.userId].push(a);
        return r;
    }, Object.create(null));

    users.map(user => {
        countPostsByUser.push(postsByUser[user].length);
    });

    const postsByUserChart = new Chart(ctxPostByUserChart, {
        type: 'doughnut',
        data: {
            labels: users.map(item => `User ${item}`),
            datasets: [{
                label: 'Posts por usuario',
                data: countPostsByUser,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(21, 159, 64, 0.2)',
                    'rgba(255, 32, 132, 0.2)',
                    'rgba(21, 21, 86, 0.2)',
                    'rgba(76, 5, 192, 0.2)',
                    'rgba(12, 21, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(21, 159, 64, 0.2)',
                    'rgba(255, 32, 132, 0.2)',
                    'rgba(21, 21, 86, 0.2)',
                    'rgba(76, 5, 192, 0.2)',
                    'rgba(12, 21, 235, 0.2)'
                ],
                borderWidth: 1,
                hoverOffset: 4
            }]
        }
    });

}).catch(function (err) {
    console.warn('Something went wrong.', err);
});

/*
    En dataset se maqueta el gráfico con los datos que se obtienen de la API o la fuente de datos desde donde se genera.
    Como puedes observar todas las gráficas tienen la misma estructura, de hecho en todas puedes mandar el mismo dataset y se van a generar sin problema.
    La razón de que en stackedChart sea diferente es por visualización y que los datos se vean mejor de cara al usuario.

    En options podemos configurar varias cosas de las gráficas, como por ejemplo definir que el tipo de gráfica sea staked o si las barras serán verticales u horizontales.
    Hay muchas cosas con las que puedes jugar moviendo la configuración.
    https://www.chartjs.org/

    En el último ejemplo podrás ver un ejemplo de una carga de datos desde una API.
    Realmente este paso cambiará dependiendo la tecnología y arquitectura usada.
    En este caso se usa una API de prueba de JSONPlaceholder. Pero en el caso de Symfony se pueden mandar el array de datos directo a la vista y manejarlo con JS.
*/

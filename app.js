const params = new URLSearchParams(window.location.search)

let quotes = [
  {
      "content": "Believe you can and you\'re halfway there",
      "author": "Theodore Roosevelt"
  },
  {
      "content": "It is in your moments of decision that your destiny is shaped",
      "author": "Tony Robbins"
  },
  {
      "content": "Energy and persistence conquer all things",
      "author": "Benjamin Franklin"
  },
  {
      "content": "If you\'re going through hell, keep going",
      "author": "Winston Churchill"
  },
  {
      "content": "Only I can change my life. No one can do it for me",
      "author": "Carol Burnett"
  },
  {
      "content": "Strength does not come from winning, Your struggles develop your strengths, When you go through hardships and decide not to surrender, that is strength",
      "author": "Arnold Schwarzenegger"
  },
  {
      "content": "The will to win, the desire to succeed, the urge to reach your full potential... these are the keys that will unlock the door to personal excellence",
      "author": "Confucius"
  },
  {
      "content": "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time",
      "author": "Thomas Edison"
  },
  {
      "content": "It always seems impossible until it\'s done",
      "author": "Nelson Mandela"
  },
  {
      "content": "Smoking: It ruins your life, her life, and their lives",
      "author": "Anonymous"
  },
  {
      "content": "Replacing the smoke on your face with a smile today will replace illness in your life with happiness tomorrow",
      "author": "Anonymous"
  },
  {
      "content": "Our strength grows out of our weakness",
      "author": "Ralph Waldo Emerson"
  },
  {
      "content": "Burn calories, not cigarettes",
      "author": "Anonymous"
  },
  {
      "content": "Believe you can and you’re halfway there",
      "author": "Theodore Roosevelt"
  },
  {
      "content": "The key is focusing on the positive. Build up the good things in your life and the smoking will go away by itself",
      "author": "Anonymous"
  },
  {
      "content": "If people don’t love themselves enough to cut down on their smoking, they may love someone else enough to do it",
      "author": "Anonymous"
  }
]


console.log(params)
  
function init() {
  
  Object.keys(quotes).forEach(function(key) {
    content = quotes[key].content
    author = quotes[key].author
    $('#slideshow2 .splide__list').append(`<li class='splide__slide'><div class='flex items-center justify-center mx-1 relative h-full' id='oneHour'><div class='flex flex-col justify-between w-96 rounded-xl shadow-md py-2 px-4 border border-gray-50 bg-sky-100 h-full'><p class='text-gray-500 font-semibold text-sm text-left italic'>${content}</p><p class='text-gray-500 text-xs mt-1author'>${author}</p></div></div></li>`)
  })

  loadCryptoInfo()

  // Recupere la date à l'instant T au démarrage de l'appli
  getRealDate()

  // Recupere la diff de temps en Timestamp entre 2 dates
  calculateTimeBtwTwoDates()

  loadDynamicInfos()
  
  loadGauge()

  windowSize = $(window).width()
  console.log(windowSize)
  if(windowSize > 1601) {
    divPerPage = 6
  } if (windowSize > 1401 && windowSize <= 1600) {
    divPerPage = 4
  } if (windowSize <= 1400) {
    divPerPage = 3
  } if (windowSize <= 375) {
    divPerPage = 2
  } 

  const splide = new Splide( '#slideshow1', {
    type: 'loop',
    drag: 'free',
    focus: 'center',
    arrows: false,
    pagination: false,
    perPage: divPerPage,
    autoScroll: {
      pauseOnHover: false,
      speed: 0.4,
    },
  });

  const splide2 = new Splide( '#slideshow2', {
    type: 'loop',
    drag: 'free',
    focus: 'center',
    arrows: false,
    pagination: false,
    perPage: divPerPage,
    direction: 'rtl',
    autoScroll: {
      pauseOnHover: false,
      speed: 0.1,
    },
  });
  
  splide.mount(window.splide.Extensions);
  splide2.mount(window.splide.Extensions);
}
  
function updateWithInterval() {
  getRealDate()
  calculateTimeBtwTwoDates()
  loadDynamicInfos()
  updateGauge()
}

function loadCryptoInfo() {
  cryptoInfo = null
  
  $.ajax({
    method: "GET",
    url: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,elrond-erd-2,chiliz&vs_currencies=eur",
  })
    .done(function( data ) {
      return cryptoInfo = data
    });
}

function getRealDate() {
  dateNow = new Date().toLocaleDateString('en-US')
  return dateNow

}

function getQuitTime() {
  // let quitDate = new Date('10/27/2022 11:29:00')
  const fallback = new Date('2022-10-27T11:29:00')
  console.log(params.get("date"), 'hey here')
  try {
    const quitDate = new Date(params.has("date") ? params.get("date") : fallback)
    console.log(quitDate, 'here')
    return quitDate;
  } catch (e) {
    return fallback;
  }
}

function calculateTimeBtwTwoDates() {
  const quitDate = getQuitTime()
  console.log(quitDate)

  let today = new Date()
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
  let dateTime = date+' '+time

  diffDays = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(quitDate.getFullYear(), quitDate.getMonth(), quitDate.getDate())) / (1000 * 60 * 60 * 24))
  diffTime = Math.abs(today - quitDate)

  quiterSince = dhm(diffTime)

  console.log(quiterSince[2])

  quiterSinceString = ''
  if (quiterSince[0] !== 0) {
    quiterSinceString += quiterSince[0] + ' years '
  } if (quiterSince[1] !== 0) {
    quiterSinceString += quiterSince[1] + ' months '
  } if (quiterSince[2] !== 0) {
    quiterSinceString += quiterSince[2] + ' days '
  } if (quiterSince[3] !== 0) {
    quiterSinceString += quiterSince[3] + ' hours '
  } if (quiterSince[4] !== 0) {
    quiterSinceString += quiterSince[4] + ' minutes '
  } if (quiterSince[5] !== 0) {
    quiterSinceString += quiterSince[5] + ' sec '
  }

  console.log(quiterSince)
  console.log(quiterSinceString)

  $('#quiterSince').empty().html('<span>since ' + quiterSinceString + '</span>')

}

function  loadDynamicInfos() {

  // Base value
  const cigarettesByDay = params.has("cigs") ? params.get("cigs") : 15
  priceOneCig = 0.465

  // let nonSmokinCigarettes = cigarettesByDay * diffDays
  unsmokedCigarettesLiveValue = (cigarettesByDay * (diffTime / 1000 / 60 / 60 / 24))
  unsmokedCigarettesLiveValueRounded = (cigarettesByDay * (diffTime / 1000 / 60 / 60 / 24)).toFixed(5)
  unsmokedCigarettesDecimals = String((unsmokedCigarettesLiveValueRounded + "").split(".")[1]).slice(0, 2)
  unsmokedCigarettes = Math.floor(cigarettesByDay * (diffTime / 1000 / 60 / 60 / 24))
  unsmokedCigarettesToDisplay = Math.floor(cigarettesByDay * (diffTime / 1000 / 60 / 60 / 24)).toLocaleString()
  console.log(unsmokedCigarettesToDisplay)
  
  packOfCig = (unsmokedCigarettes / 20)
  moneySaved = (cigarettesByDay * priceOneCig) * (diffTime / 1000 / 60 / 60 / 24)
  burgers = Math.floor(moneySaved / 10).toLocaleString()

  //bitcoin ?? 
  if (cryptoInfo != null) {
    bitcoin = moneySaved / cryptoInfo['bitcoin'].eur
    chiliz = moneySaved / cryptoInfo['chiliz'].eur
    egold = moneySaved / cryptoInfo['elrond-erd-2'].eur
  } 

  timeBetweenACig = Math.round(24 * 60 / cigarettesByDay)

  oneHourPourcentage = Math.floor((diffTime / 3600000) * 100)
  twelveHoursPourcentage = Math.floor((diffTime / 43200000) * 100)
  oneDayPourcentage = Math.floor((diffTime / 86400000) * 100)
  twoDayPourcentage = Math.floor((diffTime / 172800000) * 100)
  threeDayPourcentage = Math.floor((diffTime / 259200000) * 100)
  oneMonthPourcentage = Math.floor((diffTime / 2592000000) * 100)
  threeMonthsPourcentage = Math.floor((diffTime / 7776000000) * 100)
  nineMonthsPourcentage = Math.floor((diffTime / 23328000000) * 100)
  oneYearPourcentage = Math.floor((diffTime / 31104000000) * 100)
  tenYearsPourcentage = Math.floor((diffTime / 311040000000) * 100)
  fifteenYearsPourcentage = Math.floor((diffTime / 466560000000) * 100)
  twentyYearsPourcentage = Math.floor((diffTime / 622080000000) * 100)
  
  console.log(oneYearPourcentage)
  console.log(tenYearsPourcentage)
  console.log(fifteenYearsPourcentage)
  
  successBadge = '<span class="absolute -top-3 right-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-12 h-12 text-sky-500"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>'
  
  // We don't want more than 100%
  if (oneHourPourcentage >= 100) {
    oneHourPourcentage = 100
    // $('#oneHour').append(successBadge)
    $('#oneHourPourcentage').addClass('text-sky-700 font-bold')
  } if (twelveHoursPourcentage >= 100) {
    twelveHoursPourcentage = 100
    $('#twelveHoursPourcentage').addClass('text-sky-700 font-bold')
    // $('#twelveHours').html(successBadge)
  } if (oneDayPourcentage >= 100) {
    oneDayPourcentage = 100
    // $('#oneDay').html(successBadge)
    $('#oneDayPourcentage').addClass('text-sky-700 font-bold')
  } if (twoDayPourcentage >= 100) {
    twoDayPourcentage = 100
    // $('#twoDay').html(successBadge)
    $('#twoDayPourcentage').addClass('text-sky-700 font-bold')
  } if (threeDayPourcentage >= 100) {
    threeDayPourcentage = 100
    // $('#threeDay').html(successBadge)
    $('#threeDayPourcentage').addClass('text-sky-700 font-bold')
  } if (oneMonthPourcentage >= 100) {
    oneMonthPourcentage = 100
    // $('#oneMonth').html(successBadge)
    $('#oneMonthPourcentage').addClass('text-sky-700 font-bold')
  } if (threeMonthsPourcentage >= 100) {
    threeMonthsPourcentage = 100
    // $('#threeMonths').html(successBadge)
    $('#threeMonthsPourcentage').addClass('text-sky-700 font-bold')
  } if (nineMonthsPourcentage >= 100) {
    nineMonthsPourcentage = 100
    // $('#nineMonths').html(successBadge)
    $('#nineMonthsPourcentage').addClass('text-sky-700 font-bold')
  } if (oneYearPourcentage >= 100) {
    oneYearPourcentage = 100
    // $('#oneYear').html(successBadge)
    $('#oneYearPourcentage').addClass('text-sky-700 font-bold')
  } if (tenYearsPourcentage >= 100) {
    tenYearsPourcentage = 100
    // $('#tenYears').html(successBadge)
    $('#tenYearsPourcentage').addClass('text-sky-700 font-bold')
  } if (fifteenYearsPourcentage >= 100) {
    fifteenYearsPourcentage = 100
    // $('#fifteenYears').html(successBadge)
    $('#fifteenYearsPourcentage').addClass('text-sky-700 font-bold')
  } if (twentyYearsPourcentage >= 100) {
    twentyYearsPourcentage = 100
    // $('#twentyYears').html(successBadge)
    $('#twentyYearsPourcentage').addClass('text-sky-700 font-bold')
  }

  $('#unsmokedCigarettesLiveValue').empty().html('unsmokedCigarettesLiveValue: ' + unsmokedCigarettesLiveValue)
  $('#unsmokedCigarettesLiveValueRounded').html('unsmokedCigarettesLiveValueRounded: ' + unsmokedCigarettesLiveValueRounded)
  $('#unsmokedCigarettesLiveValueDecimals').html('unsmokedCigarettesLiveValueDecimals: ' + unsmokedCigarettesDecimals)
  $('#unsmokedCigarettes').html('unsmokedCigarettes ' + unsmokedCigarettesToDisplay)
  $('#eachMinutes').html(' ' + timeBetweenACig + ' ')
  $('#moneySaved').html('' + moneySaved.toLocaleString())
  $('#packOfCigs').html('' + Math.floor(packOfCig).toLocaleString())
  $('#burgers').html(burgers)

  $('#oneHourPourcentageStyle').css('width', oneHourPourcentage + '%')
  $('#oneHourPourcentage').html(oneHourPourcentage + '%')
  
  $('#twelveHoursPourcentageStyle').css('width', twelveHoursPourcentage + '%')
  $('#twelveHoursPourcentage').html(twelveHoursPourcentage + '%')

  $('#oneDayPourcentageStyle').css('width', oneDayPourcentage + '%')
  $('#oneDayPourcentage').html(oneDayPourcentage + '%')

  $('#twoDayPourcentageStyle').css('width', twoDayPourcentage + '%')
  $('#twoDayPourcentage').html(twoDayPourcentage + '%')

  $('#threeDayPourcentageStyle').css('width', threeDayPourcentage + '%')
  $('#threeDayPourcentage').html(threeDayPourcentage + '%')

  $('#oneMonthPourcentageStyle').css('width', oneMonthPourcentage + '%')
  $('#oneMonthPourcentage').html(oneMonthPourcentage + '%')

  $('#threeMonthsPourcentageStyle').css('width', threeMonthsPourcentage + '%')
  $('#threeMonthsPourcentage').html(threeMonthsPourcentage + '%')

  $('#nineMonthsPourcentageStyle').css('width', nineMonthsPourcentage + '%')
  $('#nineMonthsPourcentage').html(nineMonthsPourcentage + '%')

  $('#oneYearPourcentageStyle').css('width', oneYearPourcentage + '%')
  $('#oneYearPourcentage').html(oneYearPourcentage + '%')

  $('#tenYearsPourcentageStyle').css('width', tenYearsPourcentage + '%')
  $('#tenYearsPourcentage').html(tenYearsPourcentage + '%')

  $('#fifteenYearsPourcentageStyle').css('width', fifteenYearsPourcentage + '%')
  $('#fifteenYearsPourcentage').html(fifteenYearsPourcentage + '%')

  $('#twentyYearsPourcentageStyle').css('width', twentyYearsPourcentage + '%')
  $('#twentyYearsPourcentage').html(twentyYearsPourcentage + '%')
  
  if (cryptoInfo != null) {
    $('#bitcoin').html(bitcoin.toFixed(4))
    /* $('#chiliz').html('<div class="flex items-center">chiliz ' + Math.floor(chiliz) + '</strong><img src="./chz.png" class="h-8 w-8" /></div>')
    $('#egold').html('egold ' + Math.floor(egold)) */
  }

}

function loadGauge() {
  const opts = {
    lineWidth: 0,
    dialStartAngle: -90,
    dialEndAngle: -90.001,
    value: unsmokedCigarettesDecimals,
    min: 0,
    max: 100,
    valueDialClass: "value",
    valueClass: "value-text",
    dialClass: "dial",
    gaugeClass: "gauge",
    showValue: true,
    label: function() { return unsmokedCigarettesToDisplay} // returns a string label that will be rendered in the center
  }

  $.fn.gauge = function(opts) {
    this.each(function() {
      var $this = $(this),
        data = $this.data()
          
      if (data.gauge) {
        data.gauge.stop();
        delete data.gauge;
      }
      if (opts !== false) {
        data.gauge = new Gauge(this).setOptions(opts);
      }
    })
    return this;
  }
  gauge = Gauge(document.getElementById('gauge0'), opts) // create sexy gauge!
}

function updateGauge() {
  gauge = $('#gauge0').empty()

  const opts = {
    lineWidth: 0,
    dialStartAngle: -90,
    dialEndAngle: -90.001,
    value: unsmokedCigarettesDecimals,
    min: 0,
    max: 100,
    valueDialClass: "value",
    valueClass: "value-text",
    dialClass: "dial",
    gaugeClass: "gauge",
    showValue: true,
    label: function() { return unsmokedCigarettesToDisplay} // returns a string label that will be rendered in the center
  }

  gauge = Gauge(document.getElementById('gauge0'), opts) // create sexy gauge!
  
}

function dhm(ms) {
  console.log(ms)
    seconds = Math.floor(ms / 1000),
    minutes = Math.floor(seconds / 60),
    hours   = Math.floor(minutes / 60),
    days    = Math.floor(hours / 24),
    months  = Math.floor(days / 30),
    years   = Math.floor(days / 365);
  
  seconds %= 60;
  minutes %= 60;
  hours %= 24;
  days %= 30;
  months %= 12;

  console.log(seconds, 'seconds')
  console.log(minutes, 'minutes')
  console.log(hours, 'hours')
  console.log(days, 'days')
  console.log(months, 'months')
  console.log(years, 'years')

  return [ years, months, days, hours, minutes, seconds ];
}

init()

setInterval(function() {
  updateWithInterval()
}, 1000)

let app = {

  init: function() {
    console.log('init')

    app.loadCryptoInfo()

    // Recupere la date � l'instant T au d�marrage de l'appli
    app.getRealDate()

    // Recupere la diff de temps en Timestamp entre 2 dates
    app.calculateTimeBtwTwoDates()


    app.loadDynamicInfos()
    
    app.loadGauge()
  },
  
  updateWithInterval: function() {
    app.getRealDate()
    app.calculateTimeBtwTwoDates()
    app.loadDynamicInfos()
    app.updateGauge()
  },

  loadCryptoInfo: function() {
    cryptoInfo = null
    
    $.ajax({
      method: "GET",
      url: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,elrond-erd-2,chiliz&vs_currencies=eur",
    })
      .done(function( data ) {
        return cryptoInfo = data
      });
  },

  getRealDate: function() {

    dateNow = new Date().toLocaleDateString('en-US')
    return dateNow

  },

  calculateTimeBtwTwoDates: function() {

    let quitDate = new Date('10/26/2022 11:29:00');
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time

    diffDays = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(quitDate.getFullYear(), quitDate.getMonth(), quitDate.getDate())) / (1000 * 60 * 60 * 24));
    diffTime = Math.abs(today - quitDate)

    quiterSince = app.dhm(diffTime)

    $('#quiterSince').empty().html('<span>since ' + quiterSince[0] + ' days ' + quiterSince[1] + ' hours ' + quiterSince[2] + ' minutes and ' + quiterSince[3] + ' sec </span>')

  },

  loadDynamicInfos: function() {

    // Base value
    cigarettesByDay = 15 // in 24*60 = 1400min
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

    hourPourcentage = Math.floor((diffTime / 3600000) * 100)
    twelveHoursPourcentage = Math.floor((diffTime / 43200000) * 100)
    // We don't want more than 100%
    
    successBadge = '<span class="absolute -top-3 right-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-12 h-12 text-sky-500"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>'
    
    if (hourPourcentage >= 100) {
      hourPourcentage = 100
      $('#hour').append(successBadge)
    } if (twelveHoursPourcentage >= 100) {
      twelveHoursPourcentage = 100
      $('#twelveHours').html(successBadge)
    }

    $('#unsmokedCigarettesLiveValue').empty().html('unsmokedCigarettesLiveValue: ' + unsmokedCigarettesLiveValue)
    $('#unsmokedCigarettesLiveValueRounded').html('unsmokedCigarettesLiveValueRounded: ' + unsmokedCigarettesLiveValueRounded)
    $('#unsmokedCigarettesLiveValueDecimals').html('unsmokedCigarettesLiveValueDecimals: ' + unsmokedCigarettesDecimals)
    $('#unsmokedCigarettes').html('unsmokedCigarettes ' + unsmokedCigarettesToDisplay)
    $('#eachMinutes').html(' ' + timeBetweenACig + ' ')
    $('#moneySaved').html('' + moneySaved.toLocaleString())
    $('#packOfCigs').html('' + Math.floor(packOfCig).toLocaleString())
    $('#burgers').html(burgers)

    $('#hourPourcentage').css('width', hourPourcentage + '%')
    $('#twelveHoursPourcentage').css('width', twelveHoursPourcentage + '%')
    
    if (cryptoInfo != null) {
      $('#bitcoin').html(bitcoin.toFixed(4))
      $('#chiliz').html('<div class="flex items-center">chiliz ' + Math.floor(chiliz) + '</strong><img src="./chz.png" class="h-8 w-8" /></div>')
      $('#egold').html('egold ' + Math.floor(egold))
    }

  },

  loadGauge: function() {
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
    };

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
      });
      return this;
    };
    gauge = Gauge(document.getElementById('gauge0'), opts); // create sexy gauge!
  },

  updateGauge: function() {
    
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
    }; 

    gauge = Gauge(document.getElementById('gauge0'), opts); // create sexy gauge!
    
  },

  dhm: function (ms) {
    const days = Math.floor(ms / (24*60*60*1000));
    const daysms = ms % (24*60*60*1000);
    const hours = Math.floor(daysms / (60*60*1000));
    const hoursms = ms % (60*60*1000);
    const minutes = Math.floor(hoursms / (60*1000));
    const minutesms = ms % (60*1000);
    const sec = Math.floor(minutesms / 1000);
    
    return [
      days,
      hours,
      minutes,
      sec
    ]
  }

}

$(app.init)

setInterval(function() {
  $(app.updateWithInterval)
}, 1000)

let app = {

  init: function() {
    console.log('init')

    app.loadCryptoInfo()

    // Recupere la date à l'instant T au démarrage de l'appli
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

    let quitDate = new Date('01/06/2022 05:23:00');
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time

    diffDays = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(quitDate.getFullYear(), quitDate.getMonth(), quitDate.getDate())) / (1000 * 60 * 60 * 24));
    diffTime = Math.abs(today - quitDate);

    quiterSince = app.dhm(diffTime)

    $('#quiterSince').empty().html(quiterSince[0] + 'j ' + quiterSince[1] + 'h ' + quiterSince[2] + 'min ' + quiterSince[3] + 'sec')

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
    
    packOfCig = unsmokedCigarettes / 20
    moneySaved = (cigarettesByDay * priceOneCig) * (diffTime / 1000 / 60 / 60 / 24)
    burgers = moneySaved / 10

    //bitcoin ?? 
    if (cryptoInfo != null) {
      // console.log(cryptoInfo)
      // console.log(cryptoInfo['bitcoin'].eur)
      // console.log(moneySaved)
      bitcoin = moneySaved / cryptoInfo['bitcoin'].eur
      chiliz = moneySaved / cryptoInfo['chiliz'].eur
      egold = moneySaved / cryptoInfo['elrond-erd-2'].eur
      // console.log(bitcoin)
      // console.log(chiliz)
      // console.log(egold)
    } 

    timeBetweenACig = Math.round(24 * 60 / cigarettesByDay)

    $('#unsmokedCigarettesLiveValue').empty().html('<strong>unsmokedCigarettesLiveValue: ' + unsmokedCigarettesLiveValue + '</strong>')
    $('#unsmokedCigarettesLiveValueRounded').html('<strong>unsmokedCigarettesLiveValueRounded: ' + unsmokedCigarettesLiveValueRounded + '</strong>')
    $('#unsmokedCigarettesLiveValueDecimals').html('<strong>unsmokedCigarettesLiveValueDecimals: ' + unsmokedCigarettesDecimals + '</strong>')
    $('#unsmokedCigarettes').html('<strong>unsmokedCigarettes ' + unsmokedCigarettes + '</strong>')
    $('#moneySaved').html('<strong>moneySaved ' + moneySaved.toFixed(2) + '</strong>')
    $('#packOfCigs').html('<strong>packOfCig ' + Math.floor(packOfCig) + '</strong>')
    $('#burgers').html('<strong>burgers ' + Math.floor(burgers) + '</strong>')
    
    if (cryptoInfo != null) {
      $('#bitcoin').html('<div class="flex items-center"><strong>bitcoin ' + bitcoin.toFixed(4) + '</strong><img src="./btc.png" class="h-8 w-8" /></div>')
      $('#chiliz').html('<div class="flex items-center"><strong>chiliz ' + Math.floor(chiliz) + '</strong><img src="./chz.png" class="h-8 w-8" /></div>')
      $('#egold').html('<strong>egold ' + Math.floor(egold) + '</strong>')
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
      label: function() { return unsmokedCigarettes} // returns a string label that will be rendered in the center
    };

    $.fn.gauge = function(opts) {
      this.each(function() {
        var $this = $(this),
            data = $this.data();
    
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
    opts = {
      lineWidth: 0.42,
      value: unsmokedCigarettesDecimals,
      label: function() { return unsmokedCigarettes} // returns a string label that will be rendered in the center
    };
    $.fn.gauge = function(opts) {
      this.each(function() {
        var $this = $(this),
            data = $this.data();
    
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

    // $('#unsmokedCigarettesLiveValue').empty().html('<strong>unsmokedCigarettesLiveValue: ' + unsmokedCigarettesLiveValue + '</strong>')
    // $('#unsmokedCigarettesLiveValueRounded').html('<strong>unsmokedCigarettesLiveValueRounded: ' + unsmokedCigarettesLiveValueRounded + '</strong>')
    // $('#unsmokedCigarettesLiveValueDecimals').html('<strong>unsmokedCigarettesLiveValueDecimals: ' + unsmokedCigarettesDecimals + '</strong>')
    // $('#unsmokedCigarettes').html('<strong>unsmokedCigarettes ' + unsmokedCigarettes + '</strong>')
    
  },

  dhm: function(ms){
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

};


$(app.init)

setInterval(function() {
  $(app.updateWithInterval)
}, 1000)


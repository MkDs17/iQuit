let app = {

  init: function() {
    console.log('init')

    // Recupere la date à l'instant T au démarrage de l'appli
    app.getRealDate()

    // Recupere la diff de temps en Timestamp entre 2 dates
    app.calculateTimeBtwTwoDates()

    app.LoadDynamicInfos()
  },

  getRealDate: function() {

    dateNow = new Date().toLocaleDateString('en-US')
    return dateNow

  },

  calculateTimeBtwTwoDates: function() {

    let quitDate = new Date('01/01/2022 06:45:00');
    console.log(quitDate, 'quitDate')
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time
    console.log(today, 'today')
    console.log(dateTime, 'date3')

    diffDays = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(quitDate.getFullYear(), quitDate.getMonth(), quitDate.getDate())) / (1000 * 60 * 60 * 24));
    diffTime = Math.abs(today - quitDate);

    console.log(diffDays)
    console.log(diffTime)

  },

  LoadDynamicInfos: function() {

    // Base value
    cigarettesByDay = 15 // in 24*60 = 1400min
    priceOneCig = 0.465
    
    console.log((diffTime / 1000) / (24 * 60), 'this')

    // let nonSmokinCigarettes = cigarettesByDay * diffDays
    let nonSmokinCigarettes = cigarettesByDay * (diffTime / 1000 / 60 / 60 / 24)
    console.log(nonSmokinCigarettes, 'nonSmokinCigarettes')
    let packOfCig = nonSmokinCigarettes / 20
    let moneySaved = (cigarettesByDay * priceOneCig) * (diffTime / 1000 / 60 / 60 / 24)
    let burger = moneySaved / 10

    let timeBetweenACig = Math.round(24 * 60 / cigarettesByDay)

    let usefulData = {
        nonSmokinCigarettes,
        timeBetweenACig,
        packOfCig,
        moneySaved,
        burger
    }    

    console.log(usefulData)

  },

};

setInterval(function() {
    $(app.init)
}, 1000)
$(document).ready(function() {
  // Set initial player and dragon health
  $('#newChar').click(function() {
    // Set player health
    var pHealthi = Math.random() * 100;
    var pHealth = Math.floor(pHealthi);
    $('#playerHealth').text(pHealth);

    // Set dragon health
    var dHealthi = Math.random() * 100;
    var dHealth = Math.floor(dHealthi);
    $('#dragonHealth').text(dHealth);

    // Set max player/dragon health... store in webpage for accessing during attack fxn
    // Below variable necessary for calculating health bar percentages
    var pHealthmax = pHealth;
    $('#pHealthmax').text(pHealthmax);

    var dHealthmax = dHealth;
    $('#dHealthmax').text(dHealthmax);

    // Reset the result and damage boxes
    $('#result').text('Get Ready to Fight!');
    $('#result').removeClass('alert-success');
    $('#result').removeClass('alert-danger');
    $('#result').addClass('alert-warning');
    $('#pDamage').text('');
    $('#dDamage').text('');

    // Reset the health bars
    $('.progress-bar-success').css('width', '100%');
    $('.progress-bar-danger').css('width', '100%');
  });

  // Attack function
  $('#attack').click(function() {
    // Retrieve player and dragon health from webpage
    // This is needed because the variable created above are local to that function
    var pHealth = $('#playerHealth').text();
    var dHealth = $('#dragonHealth').text();
    var pHealthmax = $('#pHealthmax').text();
    var dHealthmax = $('#dHealthmax').text();

    // Check if you've already won or lost before dealing damage
    if (pHealth <= 0) {
      $('#result').text('You can\'t attack! You\'re dead!');
    } else if (pHealth > 0 && dHealth <= 0) {
      $('#result').text('You already won!');
    } else {
      // Player damage dealt to dragon
      var pDamagei = Math.random() * 20;
      var pDamage = Math.ceil(pDamagei);
      var newHealth = dHealth - pDamage;

      // Dragon damage dealt to player
      var dDamagei = Math.random() * 20;
      var dDamage = Math.floor(dDamagei);
      var youHealth = pHealth - dDamage;

      // Convert damage dealt to strings
      var psDamage = pDamage.toString();
      var dsDamage = dDamage.toString();

      // Convert health numbers to percentages of max health
      var dsiHealth = 100 * newHealth / dHealthmax;
      var psiHealth = 100 * youHealth / pHealthmax;

      // Conver health percentage to strings with percent sign for CSS use
      var dsHealth = dsiHealth.toString();
      var psHealth = psiHealth.toString();
      var dspHealth = dsHealth + '%';
      var pspHealth = psHealth + '%';

      // Check if the dragon is dead or alive
      if (newHealth <= 0 && youHealth > 0) {
        $('#result').text('You Win!');
        $('#result').removeClass('alert-warning');
        $('#result').addClass('alert-success');
        $('#pDamage').text('-' + psDamage);
        $('#dDamage').text('-' + dsDamage);
        $('#playerHealth').text(youHealth);
        $('#dragonHealth').text(newHealth);

        // Change the fullness of the health bars
        $('.progress-bar-success').css('width', pspHealth);
        $('.progress-bar-danger').css('width', dspHealth);
      } else if (youHealth <= 0) {
        $('#result').text('You Lose!');
        $('#result').removeClass('alert-warning');
        $('#result').addClass('alert-danger');
        $('#pDamage').text('-' + psDamage);
        $('#dDamage').text('-' + dsDamage);
        $('#playerHealth').text(youHealth);
        $('#dragonHealth').text(newHealth);

        // Change the fullness of the health bars
        $('.progress-bar-success').css('width', pspHealth);
        $('.progress-bar-danger').css('width', dspHealth);
      } else {
        $('#result').text('Keep Fighting!');
        $('#pDamage').text('-' + psDamage);
        $('#dDamage').text('-' + dsDamage);
        $('#playerHealth').text(youHealth);
        $('#dragonHealth').text(newHealth);

        // Change the fullness of the health bars
        $('.progress-bar-success').css('width', pspHealth);
        $('.progress-bar-danger').css('width', dspHealth);
      };
    };
  });
});

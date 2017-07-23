$(document).ready(function(){
	// Create empty enzymes array and a variable for the length of that array
	//var enzymes = ['GAATTC','GAATTC'];
	//var enz_select = enzymes.length;
	// Function that states how many enzymes selected
	//$('#enzcheck').click(function(){
	//		$('#enzs').text('You selected ' + '?' + ' enzymes. <br>');
	//		$('#eco').append(enzymes[i].length + '<br>');
	//});
	// When you click submit, create variable that stores input and print that to page
	$('#submitdna').click(function(){
		var input = $('#input').val();
		var my_dna = input.toUpperCase();
		// Show the sequence entered
		$('#sequence').text(my_dna);
		// Determine the length of the entered sequence
		dna_len = my_dna.length;
		$('#length').text(dna_len + ' bases');
		// Count number of times each base appears
		a_count = (my_dna.match(/A/g) || []).length;
		t_count = (my_dna.match(/T/g) || []).length;
		c_count = (my_dna.match(/C/g) || []).length;
		g_count = (my_dna.match(/G/g) || []).length;
		// Calculate AT and GC content
		at = a_count+t_count;
		gc = c_count+g_count;
		at_cont = at/dna_len;
		gc_cont = gc/dna_len;
		// Convert GC content from decimal to percent and write to page
		gc_percent_raw = gc_cont*100;
		gc_percent = gc_percent_raw.toFixed(2);
		$('#gc').text(gc_percent + '%');
		// Write the number of times each base appears
		$('#base').text('It contains ' + a_count + ' Adenine, ');
		$('#base').append(t_count + ' Thymine, ');
		$('#base').append(c_count + ' Cytosine, and ');
		$('#base').append(g_count + ' Guanine.');
		// If the EcoRI box is checked, then split the DNA and count length of fragments
		if ($('#ecoribox').is(":checked")){
			// Split the sequence into an array containing substring fragments
			var eco_frags = my_dna.split('GAATTC');
			var eco_lraw = eco_frags.length;
			var eco_l = eco_lraw - 1;
			$('#eco').text('There are ' + eco_l + ' EcoRI recognition sites.');
			$('#eco').append('<br>Digestion will produce the following fragment lengths: ');
			for (i=0; i<eco_frags.length; i++){
				$('#eco').append(eco_frags[i].length + ', ');
			};
			// If box is checked, will show the table row... it's display: none by default
			$('#ecorow').show();
		};
		if ($('#hindiiibox').is(":checked")){
			// Split the sequence into an array containing substring fragments
			var hind_frags = my_dna.split('AAGCTT');
			var hind_lraw = hind_frags.length;
			var hind_l = hind_lraw - 1;
			$('#hind').text('There are ' + hind_l + ' HindIII recognition sites.');
			$('#hind').append('<br>Digestion will produce the following fragment lengths: ');
			for (i=0; i<hind_frags.length; i++){
				$('#hind').append(hind_frags[i].length + ', ');
			};
			// If box is checked, will show the table row... it's display: none by default
			$('#hindrow').show();
		};
		if ($('#ncoibox').is(":checked")){
			// Split the sequence into an array containing substring fragments
			var nco_frags = my_dna.split('CCATGG');
			var nco_lraw = nco_frags.length;
			var nco_l = nco_lraw - 1;
			$('#nco').text('There are ' + nco_l + ' NcoI recognition sites.');
			$('#nco').append('<br>Digestion will produce the following fragment lengths: ');
			for (i=0; i<nco_frags.length; i++){
				$('#nco').append(nco_frags[i].length + ', ');
			};
			// If box is checked, will show the table row... it's display: none by default
			$('#ncorow').show();
		};
		if ($('#notibox').is(":checked")){
			// Split the sequence into an array containing substring fragments
			var not_frags = my_dna.split('GCGGCCGC');
			var not_lraw = not_frags.length;
			var not_l = not_lraw - 1;
			$('#not').text('There are ' + not_l + ' NotI recognition sites.');
			$('#not').append('<br>Digestion will produce the following fragment lengths: ');
			for (i=0; i<not_frags.length; i++){
				$('#not').append(not_frags[i].length + ', ');
			};
			// If box is checked, will show the table row... it's display: none by default
			$('#notrow').show();
		};
		if ($('#pstibox').is(":checked")){
			// Split the sequence into an array containing substring fragments
			var pst_frags = my_dna.split('CTGCAG');
			var pst_lraw = pst_frags.length;
			var pst_l = pst_lraw - 1;
			$('#pst').text('There are ' + pst_l + ' PstI recognition sites.');
			$('#pst').append('<br>Digestion will produce the following fragment lengths: ');
			for (i=0; i<pst_frags.length; i++){
				$('#pst').append(pst_frags[i].length + ', ');
			};
			// If box is checked, will show the table row... it's display: none by default
			$('#pstrow').show();
		};
	});
});

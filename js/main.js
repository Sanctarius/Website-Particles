// Dev by Sanctarius
// Copyright 2016

window.onload = function () {

	var canvas 				= document.getElementById( 'canvas' ),
		context 			= canvas.getContext( '2d' ),
		width 				= window.innerWidth,
		height 				= window.innerHeight,
		number_particles 	= 100,
		scale_particles 	= 30,
		particules 			= [],
		particles_color 	= ["#2ecc71", "#3498db", "#9b59b6", "#e74c3c", "#7f8c8d", "#f39c12", "#e67e22", "#f1c40f", "#c0392b"];

	canvas.width 	= width;
	canvas.height 	= height;

	// Add Particles
	for (var i = 0; i < number_particles; i++) {
		particules.push( new create_particule() );
	}

	// Create Particle
	function create_particule () {
		// Add Random Coordinate
		this.x = Math.random() * width;
		this.y = Math.random() * height;

		// Add Random Velocity
		this.vx = Math.random() * 4 - 2;
		this.vy = Math.random() * 14 - 7;

		// Add Random Color
		this.color = random_color();

		// Add Random Size
		this.radius = Math.random() * scale_particles;
	}

	// Draw Particles
	function draw () {

		// Add Background
		context.globalCompositeOperation 	= "source-over";
		context.fillStyle 					= "#2c3e50";
		context.fillRect( 0, 0, width, height );

		// Global effect
		context.globalCompositeOperation = "lighter";

		for (var t = 0; t < particules.length; t++) {

			var particule = particules[t];
			context.beginPath();
			context.fillStyle = particule.color;
			context.arc( particule.x, particule.y, particule.radius, 0, 2 * Math.PI );
			context.fill();

			// Add Gravity
			particule.x += particule.vx;
			particule.y += particule.vy;

			// Check X / Y
			if (particule.x < -20) {
				particule.x = width + 20;
			}
			if (particule.y < -20) {
				particule.y = height + 20;
			}
			if (particule.x > width + 20) {
				particule.x = -20;
			}
			if (particule.y > height + 20) {
				particule.y = -20;
			}
		}

		requestAnimationFrame( draw );
	}

	// Random Color
	function random_color () {
		var color = Math.floor( Math.random() * particles_color.length );
		return particles_color[color];
	}

	requestAnimationFrame( draw );

	/*
	 * Controller
	 * TODO Change it because it's very dirty
	 */
	document.getElementById( 'taille_particule' ).addEventListener( 'change', function () {
		var value = document.getElementById( 'taille_particule' ).value;
		for (var i = 0; i < number_particles; i++) {
			particules[i].radius = Math.random() * value;
		}
	}, false );

	document.getElementById( 'vitesse_particule' ).addEventListener( 'change', function () {
		var value = document.getElementById( 'vitesse_particule' ).value;
		for (var i = 0; i < number_particles; i++) {
			particules[i].vx = Math.random() * (value - 5) - 2;
			particules[i].vy = Math.random() * value - 7;
		}
	}, false );

}
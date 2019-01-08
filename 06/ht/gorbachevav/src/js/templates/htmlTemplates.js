let mainTemplate = `
	<div id="wrapper">
		<div id="header-section">
			<div id="title"><h1>Weather forecast</h1></div>
			<div id="top-search-request-section"></div>
		</div>		
	    <div id="map"></div>
	    <div id="info-section">
	    	<div id="info-section_wrapper"></div>
	    </div>
	    <div id="about-section"></div>
	    <div id="author-section"></div>
	<div>
`;

let requestAndSearchTemplate = `
	<fieldset id="request-method-field">
	    <legend>Choose a request method</legend>
	    <label><input type="radio" name="request-method" checked>XHR</label>
	    <label><input type="radio" name="request-method">fetch</label>
    </fieldset> 
    <div id="main-menu-section">
	    <a href="#about-section">About</a>
	    <span class="header-devider">|</span>
	    <a href="#main-section">Main</a>
	    <span class="header-devider">|</span>
	    <a href="#author-section">Author</a>
	</div>
	<div id="search-section">
		<form>
			<i class="fa fa-search fa-lg"></i>
			<input type="text" name="search" placeholder="city" maxlength="40">
		</form>
	</div>
`;


let infoSectionTemplate = `
	<div id="info-section_history">
		<div id="info-section__titles">
			<span>History</span>
		</div>
		<div id="info-section_history_items">
			<ul class="history_list">
			</ul>
		</div>
	</div>
	<div id="info-section_information">
		<div id="info-section__titles">
			<span>Today weather</span>
			<div id="info-section_current" class="info-section_data">
				<span class="weather-description"></span>
			</div>
		</div>
		<div id="info-section__titles">
			<span>Tomorrow weather</span>
			<div id="info-section_tomorrow" class="info-section_data">
				<span class="weather-description"></span>
			</div>
		</div>
	</div>
	<div id="info-section_favorites">
		<div id="info-section__titles">
			<span>Favorites</span>
		</div>
		<div id="info-section_favorite_items">
			<ul class="history_list">
			</ul>
		</div>
	</div>
`;
let aboutSectionTemplate = `
	<h2>Different APIs used in this project:</h2>
	<span>DarkSky weather forecast API</span>
	<span>Google Maps API</span>
	<span>Google Geocoding API</span>
`;

let authorSectionTemplate = `
	<h2>Here are some information about this project author:</h2>
	<span>My name is Alexandr Gorbachev</span>
	<span>My Email - <a href="mailto:nifer@tut.by">nifer@tut.by</a></span>
	<span>My Skype - alexandr-gorbachev</span>
	<span>My LinkedIn profile - <a href="https://www.linkedin.com/in/alexandr-gorbachev-55b16b161">Here</a></span>
	<img src="img/profile.jpg" alt="My appearance" height="250">
	<span>Thanks for your time!</span>
`;
export {mainTemplate, 
		requestAndSearchTemplate, 
		infoSectionTemplate, 
		aboutSectionTemplate, 
		authorSectionTemplate,
	};

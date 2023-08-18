# Your Trading Journal


![Banner Image](Back\static\images\journal_images\Trading_Journal.png)


A web-based trading journal for stock market, futures, and crypto traders. Document your trades, visualize data with interactive charts, and stay updated with real-time coin prices using Coin Market Cap's API.

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About

"Your Trading Journal" is a web-based trading journal application designed for stock market, futures, and crypto traders. It allows users to document and analyze their trades effortlessly. The application uses Django as the backend framework and React with Redux in TypeScript for the frontend. Users can log trades with essential details, visualize performance with interactive charts, and access market charts powered by the TradingView widget. Additionally, users can fetch real-time coin prices using Coin Market Cap's API. "Your Trading Journal" simplifies trade management and provides valuable insights for better decision-making.

## Installation

### Setup:

#####Backend 
Clone the repository from GitHub:
<iframe
  src="https://carbon.now.sh/embed?bg=rgba%28188%2C210%2C205%2C1%29&t=one-dark&wt=none&l=auto&width=680&ds=false&dsyoff=20px&dsblur=68px&wc=false&wa=true&pv=56px&ph=56px&ln=false&fl=1&fm=Hack&fs=14px&lh=143%25&si=false&es=2x&wm=false&code=git%2520clone%2520https%253A%252F%252Fgithub.com%252FAndyMelm%252Fdjango_redux_project.git"
  style="width: 700px; height: 176px; border:0; transform: scale(1); overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>


Navigate to the backend directory, create & activate a virtual environment:
<iframe
  src="https://carbon.now.sh/embed?bg=rgba%28188%2C210%2C205%2C1%29&t=one-dark&wt=none&l=auto&width=680&ds=false&dsyoff=20px&dsblur=68px&wc=false&wa=true&pv=56px&ph=56px&ln=false&fl=1&fm=Hack&fs=14px&lh=143%25&si=false&es=2x&wm=false&code=%2523backend%2520directory%250Acd%2520django_redux_project%252FBack%2520%250A%2523create%2520virutal%2520environment%250Apython%2520-m%2520venv%2520venv%250A%2523activate%2520virutal%2520environment%250Avenv%255CScripts%255Cactivate%2520"
  style="width: 400px; height: 259px; border:0; transform: scale(1); overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>

Install the required Python packages:
<iframe
  src="https://carbon.now.sh/embed?bg=rgba%28188%2C210%2C205%2C1%29&t=one-dark&wt=none&l=auto&width=680&ds=false&dsyoff=20px&dsblur=68px&wc=false&wa=true&pv=56px&ph=56px&ln=false&fl=1&fm=Hack&fs=14px&lh=143%25&si=false&es=2x&wm=false&code=pip%2520install%2520-r%2520requirements.txt%250A"
  style="width: 450px; height: 179px; border:0; transform: scale(1); overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>

Create ".env" file in Back directory (django_redux_project/Back) and add the following lines:
<iframe
  src="https://carbon.now.sh/embed?bg=rgba%28188%2C210%2C205%2C1%29&t=one-dark&wt=none&l=auto&width=680&ds=false&dsyoff=20px&dsblur=68px&wc=false&wa=true&pv=56px&ph=56px&ln=false&fl=1&fm=Hack&fs=14px&lh=143%25&si=false&es=2x&wm=false&code=%250ASECRET_KEY%2520%253D%2520%27YOUR_DJANGO_SECRET_KEY%27%250ADEBUG%2520%253D%2520True%250AEMAIL_HOST%2520%253D%2520%27smtp.elasticemail.com%27%2520%2523i%2520am%2520suing%2520elastic%2520email%252C%2520but%2520you%2520can%2520use%2520what%2520is%2520best%2520for%2520you%250AEMAIL_PORT%2520%253D%25202525%250AEMAIL_HOST_USER%2520%253D%2520%27YOUR_EMAIL_HOST_USER%27%250AEMAIL_HOST_PASSWORD%2520%253D%2520%27YOUR_EMAIL_HOST_PASSWORD%27%250AEMAIL_USE_TLS%2520%253D%2520True%250ADEFAULT_FROM_EMAIL%2520%253D%2520%27YOUR_DEFAULT_FROM_EMAI%27%250A%250A%2520%2523To%2520fetch%2520crypto%2520prices%2520i%2520am%2520using%2520Coin%2520Market%2520Cap%2520API-key%252C%2520please%2520add%2520yours.%250A%2520%2523https%253A%252F%252Fcoinmarketcap.com%252Fapi%252Fdocumentation%252Fv1%252F%2523section%252FQuick-Start-Guide%250Aapi_key_converter%2520%253D%2520%27YOUR_API_KEY%27"
  style="width: 700px; height: 399px; border:0; transform: scale(1); overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>

Create a superuser (optional - for admin access) & Run the Django development server:
<iframe
  src="https://carbon.now.sh/embed?bg=rgba%28188%2C210%2C205%2C1%29&t=one-dark&wt=none&l=auto&width=403&ds=false&dsyoff=20px&dsblur=68px&wc=false&wa=false&pv=56px&ph=56px&ln=false&fl=1&fm=Hack&fs=14px&lh=143%25&si=false&es=2x&wm=false&code=%2523create%2520superuser%250Apython%2520manage.py%2520createsuperuser%250A%2523run%2520the%2520server%250Apython%2520manage.py%2520runserver"
  style="width: 403px; height: 219px; border:0; transform: scale(1); overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>

The backend should now be up and running on http://localhost:8000/.

#####Frontend
Open another terminal & Navigate to the frontend directory:
<iframe
  src="https://carbon.now.sh/embed?bg=rgba%28188%2C210%2C205%2C1%29&t=one-dark&wt=none&l=auto&width=403&ds=false&dsyoff=20px&dsblur=68px&wc=false&wa=false&pv=56px&ph=56px&ln=false&fl=1&fm=Hack&fs=14px&lh=143%25&si=false&es=2x&wm=false&code=%2523frontend%2520directory%2520-%2520Front%250A%2523frontend%2520app%2520directory%2520-%2520my-app%250Acd%2520django_redux_project%252FFront%252Fmy-app%250A"
  style="width: 403px; height: 259px; border:0; transform: scale(1); overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>

Install the dependencies and run the server:
<iframe
  src="https://carbon.now.sh/embed?bg=rgba%28188%2C210%2C205%2C1%29&t=one-dark&wt=none&l=auto&width=403&ds=false&dsyoff=20px&dsblur=68px&wc=false&wa=false&pv=56px&ph=56px&ln=false&fl=1&fm=Hack&fs=14px&lh=143%25&si=false&es=2x&wm=false&code=%250A%2523install%2520the%2520dependencies%250Anpm%2520i%2520%2523or%2520npm%2520install%250A%2523run%2520the%2520server%250Anpm%2520start"
  style="width: 403px; height: 239px; border:0; transform: scale(1); overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>


## Usage

After successfully installing the project and its dependencies, you can start using "Your Trading Journal" to document and analyze your trades. 
The application will be accessible at http://localhost:3000/ in your web browser.


#####Log Trades:
* On the home page, you'll be prompted to log in or sign up for an account.
* Once logged in,navigate to the "Journal" section, click on the "Add Trade" button to add a new journal entry.
* Fill in the essential details, such as strategy, instrument, date, time, entry/exit prices, quantity, position, and outcome (win or loss).
* Add additional notes or description for the trade and attach an image if relevant.
* View or Delete existing entries.
![login](Back\static\images\journal_images\login.jpg)
![register](Back\static\images\journal_images\register.jpg)
![journal](Back\static\images\journal_images\first.png)

#####Visualize Performance:
* To view your trading performance, navigate to the "Journal Data" section.
* Observe interactive charts that display your trade history, P&L (Profit & Loss), and other relevant metrics.
![journal data](Back\static\images\journal_images\second.png)

#####Access Market Charts:
* In the "Market Charts" section, explore various charts powered by the TradingView widget.
![market charts](Back\static\images\journal_images\tview.jpg)

#####Crypto USD Converter:
* In the "Crypto USD Converter" section, enter the name and quantity of the coin you're interested in.
* Fetch real-time coin prices using Coin Market Cap's API and stay informed about current market values.
![converter](Back\static\images\journal_images\converter.png)

##### Watch the Tutorial Video

[![Tutorial](https://img.youtube.com/vi/Zi3pouhnUWQ/0.jpg)](https://www.youtube.com/watch?v=Zi3pouhnUWQ&ab_channel=AndyMelm)

Click on the image above to watch the tutorial video on YouTube.


## Features

* Log and track trades for stock market, futures, and crypto.
* Visualize trade performance with interactive charts.
* Access market charts powered by the TradingView widget. (https://www.tradingview.com/widget/symbol-overview/)
* Fetch real-time coin prices using Coin Market Cap's API. (https://coinmarketcap.com/api/documentation/v1/#section/Quick-Start-Guide)
* User-friendly interface for seamless trade management.



## Technologies

* Backend:
-Django (Python web framework)
-Django REST framework (for building RESTful APIs)
-SQLite (Database)
-Django Templates (for rendering dynamic HTML content on the server-side)

* Frontend:
-React (JavaScript library)
-Redux (state management)
-TypeScript 
-HTML
-CSS
-Bootstrap 
-MaterialUI (MUI)
-Recharts (charting library for React)

* Data Visualization:
-TradingView Widget (for interactive market charts)
-Recharts (charting library for React)

* API Integration:
-Coin Market Cap API (for fetching real-time coin prices)

##Tests

####Running Backend Tests:
To run the backend tests locally, use the following command:
<iframe
  src="https://carbon.now.sh/embed?bg=rgba%28188%2C210%2C205%2C1%29&t=one-dark&wt=none&l=auto&width=403&ds=false&dsyoff=20px&dsblur=68px&wc=false&wa=false&pv=56px&ph=56px&ln=false&fl=1&fm=Hack&fs=14px&lh=143%25&si=false&es=2x&wm=false&code=python%2520manage.py%2520test%250A"
  style="width: 403px; height: 179px; border:0; transform: scale(1); overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>

####Running Frontend Tests:
To run the frontend tests locally, use the following command:
<iframe
  src="https://carbon.now.sh/embed?bg=rgba%28188%2C210%2C205%2C1%29&t=one-dark&wt=none&l=auto&width=403&ds=false&dsyoff=20px&dsblur=68px&wc=false&wa=false&pv=56px&ph=56px&ln=false&fl=1&fm=Hack&fs=14px&lh=143%25&si=false&es=2x&wm=false&code=npm%2520test%250A"
  style="width: 403px; height: 179px; border:0; transform: scale(1); overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>

## Contributing

As "Your Trading Journal" is a personal project developed with guidance from my supervisor, I am not actively seeking external contributions at this time. However, I appreciate your interest in the project.

If you have suggestions, bug reports, or feature requests, you are welcome to raise them as issues on the GitHub repository. I will review and consider them to improve the project.

Thank you for understanding!

## License

![License](https://img.shields.io/badge/license-MIT-blue)

## Contact

If you have any questions or want to get in touch, you can reach out via:

Email: andrey.melman93@gmail.com
LinkedIn: https://www.linkedin.com/in/andrey-melman-636b49277/

For project hosting and deployment:

- Render: [https://render.com/](https://render-trading-journal.onrender.com/) 
- Netlify: [https://www.netlify.com/](https://your-trading-journal.netlify.app/) 

Admin Access:

If you would like to access the project as an admin user, please use the following credentials:

- Username: admin
- Password: 1234

Feel free to use the provided email or LinkedIn link to contact me.
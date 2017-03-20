# Databox Export Destination

A simple web server that logs all incoming requests and displays them in real time.

Live version at https://export.amar.io/.

## Install

	npm install

## Run

	[PORT=8080] npm start

## Use

	http://localhost[:PORT]

Any request made to this server will be pushed to the top of the table in real time thanks to WebSocket magic.

![Screenshot of page](screencap.png "Screenshot of Page")

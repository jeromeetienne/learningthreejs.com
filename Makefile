# Makefile to make automatize simple tasks

server:
	rake preview

serverStatic:
	(cd public && python -m SimpleHTTPServer)

build:
	rake generate

deploy: build
	rake deploy

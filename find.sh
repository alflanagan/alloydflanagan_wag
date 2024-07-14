#!/bin/sh

exec find . \
	-name .terraform -prune -o \
	-name .idea -prune -o \
	-name '*cache*' -prune -o \
	-name __pycache__ -prune -o \
	-name .yarn -prune -o \
	-name .git -prune -o \
	-type f -print 

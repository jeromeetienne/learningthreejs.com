cp orig/back.jpg	pz.jpg
cp orig/front.jpg	nz.jpg

cp orig/left.jpg	nx.jpg
cp orig/right.jpg	px.jpg

cp orig/down.jpg	ny.jpg
cp orig/up.jpg		py.jpg

mogrify -rotate 90	ny.jpg
mogrify -rotate 270	py.jpg
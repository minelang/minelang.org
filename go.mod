module github.com/minelang/sites

go 1.21

require (
	github.com/gohugoio/hugo-mod-bootstrap-scss/v5 v5.20300.20800
	github.com/maysara-elshewehy/minedocs-theme v0.0.0
)

require (
	github.com/gohugoio/hugo-mod-jslibs-dist/popperjs/v2 v2.21100.20000 // indirect
	github.com/twbs/bootstrap v5.3.8+incompatible // indirect
)

replace github.com/maysara-elshewehy/minedocs-theme => ./themes/minedocs-theme

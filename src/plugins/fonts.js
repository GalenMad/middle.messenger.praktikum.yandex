import("webfontloader").then((WebFont) => {
    WebFont.load({
        google: {
            families: [
                "Montserrat:100,200,300,400,500,600,700,800,900:cyrillic,latin",
                "Roboto:100,200,300,400,500,600,700,800,900:cyrillic,latin"
            ],
        },
    });
});
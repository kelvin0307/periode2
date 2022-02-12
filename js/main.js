

const test = () => {
    const feed = $("#instagram-feed");

    
    console.log(feed)
    // jQuery Ajax for feed Instagram Graph API
    if (feed.length != 0) {
      const token =
        "IGQVJVMWw1QmJFOGdHYmdMZAXhUZATJLYWFLT1M1eE9iM1pHaVM2d0pOR3k5MWdUTTRaODZAPQ2NzbWlnUUd1SF9wbHlGMktseGYxNDJHSV9ibkQybTFUUkRmVUwtTFJ3ZAzlDTmFzenpKV3VjSkhDUVE4dwZDZD";
      const fields =
        "id,media_type,media_url,thumbnail_url,timestamp,permalink,caption";
      const limit = 4;
      let html = "";
    
      $.ajax({
        url:
          "https://graph.instagram.com/me/media?fields=" +
          fields +
          "&access_token=" +
          token +
          "&limit=" +
          limit,
        type: "GET",
        success: function (response) {
          const medias = response.data;
    
          medias.map((media) => {
            console.log(media);
            if (media.media_type === "VIDEO") {
              html += `<div class="instagram_new">
                  <a class="insta-link" href="${media.permalink}" rel="noopener" target="_blank">
                    <img src="${media.image_video}" loading="lazy" alt="${media.caption}" class="insta-image" />
                  </a>
                </div>`;
            } else {
              html += `<div class="instagram_new">
                <a class="insta-link" href="${media.permalink}" rel="noopener" target="_blank">
                  <img src="${media.media_url}" loading="lazy" alt="${media.caption}" class="insta-image" />
                </a>
              </div>`;
            }
          });
    
          feed.append(html);
        },
        error: function (error) {
          console.log(error);
    
          const html = '<div class="class-no-data">No Images Found</div>';
          feed.append(html);
        },
      });
    }
}

$(document).ready(function(){
    //intitial
    $('#mainContent').load('content/index.html');

    //handle menu clicks
    $('header nav ul li a').click(function(){
        var page = $(this).attr('href');
        $('#mainContent').load('content/' + page + '.html');
        if (page === 'behind') {
            setTimeout(() => test(), 50);
        }
        return false
    })
});
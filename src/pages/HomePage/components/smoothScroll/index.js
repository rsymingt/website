
import $ from "jquery";

const smoothScroll = (event) => {
  // Add smooth scrolling to all links
    let el = event.target;
    // Make sure this.hash has a value before overriding default behavior

    if (el.hash && (el.hash !== ""))  {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = el.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } else {
        event.preventDefault();
        
        $('html, body').animate({
          scrollTop: 0
        }, 800, function(){

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = "#";
        });
    }
}

export default smoothScroll;

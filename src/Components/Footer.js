import React, {useEffect} from 'react'
import $ from 'jquery'

const FooterComponent = (props) => {

    useEffect(() => {
        // back-to-top
        // slideDown Or slideUp
        $(document).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $(".back-to-top").slideDown('slow');
            } else {
                $(".back-to-top").slideUp('slow');
            }
        });
    }, []);

    // handleBackToTop
    function handleBackToTop(e) {
        e.preventDefault();
        $("html, body").animate({scrollTop: 0}, 600);
    }

    return (
        <React.Fragment>
            <footer id="footer">
                <div className="container">
                    <div className="copy_right text-center">
                        <p>©{new Date().getFullYear()}. All Rights Reserved. Yummi Pizza
                        </p>
                    </div>
                </div>
            </footer>
            <a href="/#" rel="noreferrer noopener" className="back-to-top" onClick={(e) => {
                handleBackToTop(e);
            }}>
                &#8593;
            </a>
        </React.Fragment>
    )
};

export default FooterComponent;

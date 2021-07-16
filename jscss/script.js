jQuery(function(){

    //Variables

    var clickedElements = [];
    let deleteElement = document.getElementById('delete');
    const fadeSpeed = 75;
    const newTodoInput = document.getElementById('inputText');
    const checkToken = "Ab192lJ73!lk6vvaW"; //A token that is "impossible" to just type
    const offset = 10;
    let device = 3; // set 3 standard (3 == rightclick)
    const cookiepolicy = 'We only store what you put in so that you can see it when you revisit us. We do not sell or give your info to any 3rd Party Service. All the information we collect is stored locally on your system';
    const editText = document.getElementById('#editText');

    //New Box

    /**To Change the attributes when checking a box */
    $(document).on('change','input:checkbox',function(){
        const elementKey = $(this).parent().attr('id');
        const elementText = localStorage.getItem(elementKey);
        if ($(this).is(':checked')) {    
            if (!(elementKey == 'firsttime')) {
                localStorage.setItem(elementKey, checkToken + elementText);
            }
            $(this).parent().addClass('doneTask');
            console.log(checkToken);
        } else if(!$(this).is(':checked')) {
            if (!(elementKey == 'firsttime')) {
                var elementNotoken = elementText.substr(`${checkToken.length}`)
                localStorage.setItem(elementKey, elementNotoken);
            }

            $(this).parent().removeClass('doneTask');

        }

    });
   /** */

    

    function creatTodo(input, key){

        if (input.substr(0, `${checkToken.length}`) == checkToken) {
            $('<li>').text(input.substr(`${checkToken.length}`)).appendTo('#dragNDropList').addClass('listelement elementListGrid needCheckbox ui-sortable-handle').attr('id', key);   
        } else {
            $('<li>').text(input).appendTo('#dragNDropList').addClass('listelement elementListGrid needCheckbox ui-sortable-handle').attr('id', key);
        }

        addCheckbox()

    }



    function addCheckbox() {

        var elementNoCheck = $('.needCheckbox');

        $('<input />', { type: 'checkbox', class: 'checkbox'}).appendTo(elementNoCheck);

        $('.needCheckbox').removeClass('needCheckbox');

    }

    /**Add to site/ local storage */
    $('#input').submit(function() {

        const key = Math.random();
        const value = newTodoInput.value;

        while (!localStorage.getItem(key) === null) {
            key = Math.random(); // If key already exist, Loop until Key is unique
        }
        
        if (key && value) {
            creatTodo(value, key);
            localStorage.setItem(key, value)
            $('#inputText').val(''); 
        }

        return false;

    });
    /** */


    //Remove
    $(window).mouseup(function(event) {
        clickedElements[0] = event.target;
        if (event.which === device) { //3 == rightclick, 1 == leftclick
            if ($(event.target).hasClass('listelement')) {

                deleteElement.style.top = event.clientY - offset + 'px';

                deleteElement.style.left = event.clientX - offset + 'px';

                deleteElement.classList.add('active');

                $(deleteElement).show();
                $(deleteElement).mousedown(function() {
                    removeFromLS(clickedElements[0]);
                    $(clickedElements[0]).remove();
                    hideRemover();
                });

            }
        }

    });
    /**Remover element stuff */
    function hideRemover(){
        deleteElement.classList.remove('active');
        $(deleteElement).fadeOut(fadeSpeed);
    }

    $(deleteElement).mouseleave(function() {
        hideRemover();
    });

    $(window).scroll(function() {
        hideRemover();
    });
    /**Remove from Local storage */
    function removeFromLS(element) { //Called when clicke on red remove
        const removeKey = element.id;
        localStorage.removeItem(removeKey);
    }
    /**On page startup check items that was checkd before site close */

    function checkLSIfElementChecked(key) {
        const value = localStorage.getItem(key);
        const checked = value.substr(0, `${checkToken.length}`);
        if (checked == checkToken) {
            markTheBoxOfLSElement(key);    
        }
    }

    function markTheBoxOfLSElement(key) {
        const markedElement = document.getElementById(key);
        $(markedElement).children().prop('checked', true);
        $(markedElement).addClass('doneTask');
    }

    window.addEventListener('contextmenu', function (e) { 
        e.preventDefault(); 
    }, false);

    /**Cookies */
    if (localStorage.getItem('cookieSeen') != 'shown') {
        $('.cookie-banner').delay(2000).fadeIn();
        localStorage.setItem('cookieSeen','shown')
    };
    $('.close').click(function() {
        $('.cookie-banner').fadeOut();
    })
    $('#cookiePolicy').click(function(){
        alert(cookiepolicy);
    })
    /** */

    /**First time visit */
    if (localStorage.getItem('newUser') != 'no'){
        creatTodo('Create new Todos', 'firsttime');
        creatTodo('Rightclick to remove a todo from the list');
        localStorage.setItem('newUser', 'no');
    }
    /** */
    //On page Startup*******************************/

    window.mobileCheck = function() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };

    if (mobileCheck()) {
        device = 1;
    }

    for (let i = 0; i <= 1; i++) {
        for (let j = 0; j < localStorage.length; j++) {
            const key = localStorage.key(j);
            if (key.substr(0,1) == 0){
                const val = localStorage.getItem(key);
                if (i == 0) {
                    if (val.substr(0, `${checkToken.length}`) != checkToken) {
                        creatTodo(val, key);
                        checkLSIfElementChecked(key);
                    } else {
                        continue;
                    }
                } else if (i == 1) {
                    if (val.substr(0, `${checkToken.length}`) == checkToken) {
                        creatTodo(val, key);
                        checkLSIfElementChecked(key);
                    } else {
                        continue;
                    }
                }
            }
        }
    }
    
    /** */
    
    /**Drag and drop */
    $("#dragNDropList" ).sortable({});
    $("#dragNDropList").disableSelection();
    /** */

});
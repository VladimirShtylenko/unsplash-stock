const swiper = new Swiper('.header__bottom', {
    freeMode: true,
    loop: false,
    slidesPerView: 12,

});
const apiKey = 'FwuWfZ41D0_mdm10DgpkT01rsJXgANpTZsvLP5czO8g',
    headerLink = document.querySelectorAll('.bottom__link'),
    searchInput = document.getElementById('search-input'),
    layoutListBtn = document.querySelector('.layout'),
    layoutGridBtn = document.querySelector('.grid');

let count = 21,
    apiUrl,
    content = document.querySelector('.gallery__content'),
    relatedContent = document.querySelector('.related__images'),
    searchBottom = document.querySelector('.search-bottom'),
    photoPage = document.querySelector('.photo-page'),
    favoritesContent = document.querySelector('.favorites__content');


//Функция создания атрибутов новым элементам
function setAttr(elem, attr) {
    for (const key in attr) {
        elem.setAttribute(key, attr[key]);
    }

}
//Основная функция которая делает запрос в API и получает данные
function makeApiRequest(url) {

    if (content) {
        content.innerHTML = '';
    }

    fetch(url)
        .then(function (data) {
            return data.json();
        })
        .then(function (data) {
            let i = 1;
            data.forEach(photo => {
                const item = document.createElement('div');
                setAttr(item, {
                    class: `item item-${i++}`,
                });

                let instaName = photo.user.instagram_username;
                if (instaName == null || instaName == 'null') {
                    instaName = ' No Account';
                }
                item.innerHTML = `<img src="${photo.urls.regular}" alt="${photo.alt_description}" title="${photo.alt_description}" class="gallery__img">
            <div class="item__info"><a class="info__photo" href="#">
                <img src="${photo.user.profile_image.medium}" alt="${photo.user.name}"></a>
                <span class="info__name">${photo.user.name}</span>
                <a href="https://www.instagram.com/${instaName}" class="info__social">@${instaName}</a>
                <ul class="info__nav">
                    <li>
                        <a href="#" class="favorite-link">
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="icon/action/favorite_24px">
                            <path id="icon/action/favorite_24px_2" d="M18.9121 28.7685C17.8354 29.746 16.1779 29.7461 15.1013 28.7544L14.9454 28.6127C7.50794 21.8836 2.64877 17.4777 2.83294 11.981C2.91794 9.57272 4.15044 7.26355 6.14794 5.90355C9.88794 3.35355 14.5063 4.54355 16.9996 7.46188C19.4929 4.54355 24.1113 3.33938 27.8513 5.90355C29.8488 7.26355 31.0813 9.57272 31.1663 11.981C31.3646 17.4777 26.4913 21.8835 19.0538 28.641L18.9121 28.7685Z" fill="white"></path>
                            </g>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a data-fancybox="fancybox" href="${photo.urls.regular}">
                            <svg width="34" height="33" viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.8333 4.12123C19.8333 3.36254 20.4675 2.7475 21.2499 2.7475H29.7499C30.5323 2.7475 31.1666 3.36254 31.1666 4.12123V12.3637C31.1666 13.1224 30.5323 13.7374 29.7499 13.7374C28.9675 13.7374 28.3333 13.1224 28.3333 12.3637V5.49497H21.2499C20.4675 5.49497 19.8333 4.87993 19.8333 4.12123Z" fill="white"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.24992 19.2323C5.03232 19.2323 5.66658 19.8473 5.66658 20.606V27.4747H12.7499C13.5323 27.4747 14.1666 28.0898 14.1666 28.8485C14.1666 29.6072 13.5323 30.2222 12.7499 30.2222H4.24992C3.46752 30.2222 2.83325 29.6072 2.83325 28.8485V20.606C2.83325 19.8473 3.46752 19.2323 4.24992 19.2323Z" fill="white"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M30.7518 3.14986C31.3051 3.68633 31.3051 4.55614 30.7518 5.09261L20.8351 14.7088C20.2819 15.2453 19.3849 15.2453 18.8317 14.7088C18.2784 14.1723 18.2784 13.3025 18.8317 12.766L28.7483 3.14986C29.3016 2.61338 30.1986 2.61338 30.7518 3.14986Z"
                            fill="white"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1683 18.2609C15.7216 18.7974 15.7216 19.6672 15.1683 20.2037L5.25165 29.8199C4.69841 30.3563 3.80143 30.3563 3.24818 29.8199C2.69494 29.2834 2.69494 28.4136 3.24818 27.8771L13.1649 18.2609C13.7181 17.7245 14.6151 17.7245 15.1683 18.2609Z"
                            fill="white"></path>
                            </svg></a></li>
                    <li>
                        <a href="photo-page.html" class="download-link" data-categories="${photo}">
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="icon/file/download_24px">
                            <path id="icon/file/download_24px_2" fill-rule="evenodd" clip-rule="evenodd" d="M21.2499 13.4584H23.5024C24.7633 13.4584 25.3866 14.9884 24.4941 15.8809L17.9916 22.3834C17.4391 22.9359 16.5466 22.9359 15.9941 22.3834L9.49159 15.8809C8.59909 14.9884 9.23659 13.4584 10.4974 13.4584H12.7499V6.37504C12.7499 5.59587 13.3874 4.95837 14.1666 4.95837H19.8333C20.6124 4.95837 21.2499 5.59587 21.2499 6.37504V13.4584ZM8.49992 29.0417C7.72075 29.0417 7.08325 28.4042 7.08325 27.6251C7.08325 26.8459 7.72075 26.2084 8.49992 26.2084H25.4999C26.2791 26.2084 26.9166 26.8459 26.9166 27.6251C26.9166 28.4042 26.2791 29.0417 25.4999 29.0417H8.49992Z" fill="white"></path>
                            </g>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>`;
                if (content) {
                    content.appendChild(item);
                }

                let downloadLink = document.querySelectorAll('.download-link');
                downloadLink.forEach(elem => {
                    elem.addEventListener('click', () => {
                        sessionStorage.removeItem('imageUrl');
                        sessionStorage.removeItem('imageUser');
                        sessionStorage.removeItem('userName');
                        sessionStorage.removeItem('userLink');
                        sessionStorage.removeItem('query');
                        sessionStorage.setItem('imageUrl', elem.parentElement.parentElement.parentElement.previousElementSibling.src);
                        sessionStorage.setItem('imageUser', elem.parentElement.parentElement.parentElement.firstChild.children[0].src);
                        sessionStorage.setItem('userName', elem.parentElement.parentElement.parentElement.children[1].innerText);
                        sessionStorage.setItem('userLink', elem.parentElement.parentElement.parentElement.children[2].innerHTML);
                        sessionStorage.setItem('query', elem.parentElement.parentElement.parentElement.previousElementSibling.alt);
                    });
                });




            });
            let favoriteLink = document.querySelectorAll('.favorite-link');
            favoriteLink.forEach(elem => {
                elem.addEventListener('click', (e) => {
                    e.preventDefault();
                    addFavoritesToLocal(elem, elem.parentElement.parentElement.parentElement.previousElementSibling.src, 'favoriteImages');
                    addFavoritesToLocal(elem, elem.parentElement.parentElement.parentElement.firstChild.children[0].src, 'favoriteUserImage');
                    addFavoritesToLocal(elem, elem.parentElement.parentElement.parentElement.children[1].innerText, 'favoriteUserName');
                    addFavoritesToLocal(elem, elem.parentElement.parentElement.parentElement.children[2].innerHTML, 'favoriteUserLink');
                });
            });
        });

}
//Функция отображает контент на странице фотографиии
function photoPageApiRequest(url) {
    if (photoPage) {
        photoPage.innerHTML = '';
    }

    fetch(url)
        .then(function (data) {
            return data.json();
        })
        .then(function (data) {
            data.forEach(photo => {
                const interface = document.createElement('section');
                setAttr(interface, {
                    class: 'photo',
                });
                let imageUrl = sessionStorage.getItem('imageUrl'),
                    userImage = sessionStorage.getItem('imageUser'),
                    userName = sessionStorage.getItem('userName'),
                    userLink = sessionStorage.getItem('userLink');
                userLink = userLink.replace(/^@/, '');
                interface.innerHTML = `<img class="photo__bg"
            src="${imageUrl}" alt="">
             <div class="container">
            <div class="photo__content">
                    <!-- Контент внутренней страницы фотографии -->
                    <div class="photo__content__top">
                            <div class="top__left">
                                    <div class="top__user-image">
                                            <img src="${userImage}"
                                                    alt="photo">
                                    </div>
                                    <div class="top__user-info">
                                            <span class="user-name">
                                                    ${userName}
                                            </span>
                                            <a href="https://instagram.com/${userLink}" target=""_blanc class="user-insta">
                                                   @${userLink}
                                            </a>
                                    </div>
                            </div>
                            <div class="top__right">
                                    <a href="#" class="favorites">
                                            <svg width="26" height="23" viewBox="0 0 26 23"
                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.5782 21.9207C13.6142 22.796 12.1302 22.796 11.1661 21.9081L11.0266 21.7812C4.36736 15.7562 0.0166355 11.8114 0.181532 6.88984C0.257637 4.7335 1.36117 2.66596 3.14966 1.44827C6.49832 -0.834911 10.6334 0.230571 12.8658 2.84354C15.0983 0.230571 19.2334 -0.847595 22.582 1.44827C24.3705 2.66596 25.4741 4.7335 25.5502 6.88984C25.7277 11.8114 21.3643 15.7562 14.7051 21.8066L14.5782 21.9207Z"
                                                            fill="#828282" />
                                            </svg>
                                    </a>
                                    <a href="${imageUrl}" target="_blanc" class="download">
                                            <svg width="34" height="34" viewBox="0 0 34 34"
                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="icon/file/download_24px">
                                                            <path id="icon/file/download_24px_2"
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M21.2499 13.4584H23.5024C24.7633 13.4584 25.3866 14.9884 24.4941 15.8809L17.9916 22.3834C17.4391 22.9359 16.5466 22.9359 15.9941 22.3834L9.49159 15.8809C8.59909 14.9884 9.23659 13.4584 10.4974 13.4584H12.7499V6.37502C12.7499 5.59585 13.3874 4.95835 14.1666 4.95835H19.8333C20.6124 4.95835 21.2499 5.59585 21.2499 6.37502V13.4584ZM8.49992 29.0417C7.72075 29.0417 7.08325 28.4042 7.08325 27.625C7.08325 26.8459 7.72075 26.2084 8.49992 26.2084H25.4999C26.2791 26.2084 26.9166 26.8459 26.9166 27.625C26.9166 28.4042 26.2791 29.0417 25.4999 29.0417H8.49992Z"
                                                                    fill="white" />
                                                    </g>
                                            </svg>
                                            <span>Download</span>
                                    </a>
                            </div>
                    </div>
                    <div class="photo__content__middle">
                            <img src="${imageUrl}"
                                    alt="image">
                    </div>
                    <div class="photo__content__bottom">
                            <span>Похожии теги</span>
                            <ul>
                                    <li><a href="#">Girl</a></li>
                                    <li><a href="#">Woman</a></li>
                                    <li><a href="#">Mood</a></li>
                                    <li><a href="#">Mood</a></li>
                                    <li><a href="#">Free Pictures</a></li>
                            </ul>
                    </div>
            </div>

            </div>`;
                if (photoPage) {
                    photoPage.insertAdjacentElement('afterbegin', interface);
                }

            });
        });
}
//Функция отображает список похожих фото на странице фотографии
function makeApiRequestInner(url) {
    if (relatedContent) {
        relatedContent.innerHTML = '';
    }

    fetch(url)
        .then(function (data) {
            return data.json();
        })
        .then(function (data) {
            let i = 1;
            const title = document.createElement('h1');
            setAttr(title, {
                class: 'page-title',
            });
            title.innerHTML = 'Похожие фотографии';
            data.forEach(photo => {
                console.log(photo);

                const item = document.createElement('div');
                setAttr(item, {
                    class: `item item-${i++}`,
                });
                let instaName = photo.user.instagram_username;
                if (instaName == null || instaName == 'null') {
                    instaName = ' No Account';
                }
                item.innerHTML = `<img src="${photo.urls.regular}" alt="${photo.alt_description}" title="${photo.alt_description}" class="gallery__img">
            <div class="item__info"><a class="info__photo" href="#">
                <img src="${photo.user.profile_image.medium}" alt="${photo.user.name}"></a>
                <span class="info__name">${photo.user.name}</span>
                <a href="https://www.instagram.com/${instaName}" class="info__social">@${instaName}</a>
                <ul class="info__nav">
                    <li>
                        <a href="#" class="favorite-link">
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="icon/action/favorite_24px">
                            <path id="icon/action/favorite_24px_2" d="M18.9121 28.7685C17.8354 29.746 16.1779 29.7461 15.1013 28.7544L14.9454 28.6127C7.50794 21.8836 2.64877 17.4777 2.83294 11.981C2.91794 9.57272 4.15044 7.26355 6.14794 5.90355C9.88794 3.35355 14.5063 4.54355 16.9996 7.46188C19.4929 4.54355 24.1113 3.33938 27.8513 5.90355C29.8488 7.26355 31.0813 9.57272 31.1663 11.981C31.3646 17.4777 26.4913 21.8835 19.0538 28.641L18.9121 28.7685Z" fill="white"></path>
                            </g>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a data-fancybox="fancybox" href="${photo.urls.regular}">
                            <svg width="34" height="33" viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.8333 4.12123C19.8333 3.36254 20.4675 2.7475 21.2499 2.7475H29.7499C30.5323 2.7475 31.1666 3.36254 31.1666 4.12123V12.3637C31.1666 13.1224 30.5323 13.7374 29.7499 13.7374C28.9675 13.7374 28.3333 13.1224 28.3333 12.3637V5.49497H21.2499C20.4675 5.49497 19.8333 4.87993 19.8333 4.12123Z" fill="white"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.24992 19.2323C5.03232 19.2323 5.66658 19.8473 5.66658 20.606V27.4747H12.7499C13.5323 27.4747 14.1666 28.0898 14.1666 28.8485C14.1666 29.6072 13.5323 30.2222 12.7499 30.2222H4.24992C3.46752 30.2222 2.83325 29.6072 2.83325 28.8485V20.606C2.83325 19.8473 3.46752 19.2323 4.24992 19.2323Z" fill="white"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M30.7518 3.14986C31.3051 3.68633 31.3051 4.55614 30.7518 5.09261L20.8351 14.7088C20.2819 15.2453 19.3849 15.2453 18.8317 14.7088C18.2784 14.1723 18.2784 13.3025 18.8317 12.766L28.7483 3.14986C29.3016 2.61338 30.1986 2.61338 30.7518 3.14986Z"
                            fill="white"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1683 18.2609C15.7216 18.7974 15.7216 19.6672 15.1683 20.2037L5.25165 29.8199C4.69841 30.3563 3.80143 30.3563 3.24818 29.8199C2.69494 29.2834 2.69494 28.4136 3.24818 27.8771L13.1649 18.2609C13.7181 17.7245 14.6151 17.7245 15.1683 18.2609Z"
                            fill="white"></path>
                            </svg></a></li>
                    <li>
                        <a href="photo-page.html" class="download-link" data-categories="${photo}">
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="icon/file/download_24px">
                            <path id="icon/file/download_24px_2" fill-rule="evenodd" clip-rule="evenodd" d="M21.2499 13.4584H23.5024C24.7633 13.4584 25.3866 14.9884 24.4941 15.8809L17.9916 22.3834C17.4391 22.9359 16.5466 22.9359 15.9941 22.3834L9.49159 15.8809C8.59909 14.9884 9.23659 13.4584 10.4974 13.4584H12.7499V6.37504C12.7499 5.59587 13.3874 4.95837 14.1666 4.95837H19.8333C20.6124 4.95837 21.2499 5.59587 21.2499 6.37504V13.4584ZM8.49992 29.0417C7.72075 29.0417 7.08325 28.4042 7.08325 27.6251C7.08325 26.8459 7.72075 26.2084 8.49992 26.2084H25.4999C26.2791 26.2084 26.9166 26.8459 26.9166 27.6251C26.9166 28.4042 26.2791 29.0417 25.4999 29.0417H8.49992Z" fill="white"></path>
                            </g>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>`;


                if (relatedContent) {
                    relatedContent.insertAdjacentElement('beforebegin', title);
                    relatedContent.appendChild(item);
                }


                let downloadLink = document.querySelectorAll('.download-link');
                downloadLink.forEach(elem => {
                    elem.addEventListener('click', () => {
                        sessionStorage.removeItem('imageUrl');
                        sessionStorage.removeItem('imageUser');
                        sessionStorage.removeItem('userName');
                        sessionStorage.removeItem('userLink');
                        sessionStorage.removeItem('query');
                        sessionStorage.setItem('imageUrl', elem.parentElement.parentElement.parentElement.previousElementSibling.src);
                        sessionStorage.setItem('imageUser', elem.parentElement.parentElement.parentElement.firstChild.children[0].src);
                        sessionStorage.setItem('userName', elem.parentElement.parentElement.parentElement.children[1].innerText);
                        sessionStorage.setItem('userLink', elem.parentElement.parentElement.parentElement.children[2].href);
                        sessionStorage.setItem('query', elem.parentElement.parentElement.parentElement.previousElementSibling.alt);
                    });
                });

            });
            let favoriteLink = document.querySelectorAll('.favorite-link');
            favoriteLink.forEach(elem => {
                elem.addEventListener('click', (e) => {
                    e.preventDefault();
                    addFavoritesToLocal(elem, elem.parentElement.parentElement.parentElement.previousElementSibling.src, 'favoriteImages');
                    addFavoritesToLocal(elem, elem.parentElement.parentElement.parentElement.firstChild.children[0].src, 'favoriteUserImage');
                    addFavoritesToLocal(elem, elem.parentElement.parentElement.parentElement.children[1].innerText, 'favoriteUserName');
                    addFavoritesToLocal(elem, elem.parentElement.parentElement.parentElement.children[2].innerHTML, 'favoriteUserLink');
                });

            });
        });
}

//Функция добавления избранного в локальное хранилище
function addFavoritesToLocal(element, str, name) {
    let imageArr = [];
    element.classList.add('liked');
    imageArr = JSON.parse(localStorage.getItem(name)) || [];
    imageArr.push(str);
    localStorage.setItem(name, JSON.stringify(imageArr));
}

//Функция добавления избранных фото на страницу избранного
function addToFavoritesBlock(name) {
    if (favoritesContent) {
        for (let key in localStorage) {
            let favImg = [];
            if (key == name) {
                favImg = JSON.parse(localStorage.getItem(key));
                favUserLink = JSON.parse(localStorage.getItem('favoriteUserLink'));
                favUserName = JSON.parse(localStorage.getItem('favoriteUserName'));
                favUserImg = JSON.parse(localStorage.getItem('favoriteUserImage'));
                let num = 1;
                for (let i = 0; i < favImg.length; i++) {
                    let div = document.createElement('div');
                    setAttr(div, {
                        class: `item item-${num++}`,
                    });
                    favoritesContent.appendChild(div);
                    div.innerHTML = `<img src="${favImg[i]}" alt="Img" title="Img" class="gallery__img">
            <div class="item__info"><a class="info__photo" href="#">
                <img src="${favUserImg[i]}" alt="${favUserName[i]}"></a>
                <span class="info__name">${favUserName[i]}</span>
                <a href="https://www.instagram.com/${favUserLink[i]}" class="info__social">@${favUserLink[i]}</a>
                <ul class="info__nav">
                    <li>
                        <a href="#" class="favorite-link">
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="icon/action/favorite_24px">
                            <path id="icon/action/favorite_24px_2" d="M18.9121 28.7685C17.8354 29.746 16.1779 29.7461 15.1013 28.7544L14.9454 28.6127C7.50794 21.8836 2.64877 17.4777 2.83294 11.981C2.91794 9.57272 4.15044 7.26355 6.14794 5.90355C9.88794 3.35355 14.5063 4.54355 16.9996 7.46188C19.4929 4.54355 24.1113 3.33938 27.8513 5.90355C29.8488 7.26355 31.0813 9.57272 31.1663 11.981C31.3646 17.4777 26.4913 21.8835 19.0538 28.641L18.9121 28.7685Z" fill="white"></path>
                            </g>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a data-fancybox="fancybox" href="${favImg[i]}">
                            <svg width="34" height="33" viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.8333 4.12123C19.8333 3.36254 20.4675 2.7475 21.2499 2.7475H29.7499C30.5323 2.7475 31.1666 3.36254 31.1666 4.12123V12.3637C31.1666 13.1224 30.5323 13.7374 29.7499 13.7374C28.9675 13.7374 28.3333 13.1224 28.3333 12.3637V5.49497H21.2499C20.4675 5.49497 19.8333 4.87993 19.8333 4.12123Z" fill="white"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.24992 19.2323C5.03232 19.2323 5.66658 19.8473 5.66658 20.606V27.4747H12.7499C13.5323 27.4747 14.1666 28.0898 14.1666 28.8485C14.1666 29.6072 13.5323 30.2222 12.7499 30.2222H4.24992C3.46752 30.2222 2.83325 29.6072 2.83325 28.8485V20.606C2.83325 19.8473 3.46752 19.2323 4.24992 19.2323Z" fill="white"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M30.7518 3.14986C31.3051 3.68633 31.3051 4.55614 30.7518 5.09261L20.8351 14.7088C20.2819 15.2453 19.3849 15.2453 18.8317 14.7088C18.2784 14.1723 18.2784 13.3025 18.8317 12.766L28.7483 3.14986C29.3016 2.61338 30.1986 2.61338 30.7518 3.14986Z"
                            fill="white"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1683 18.2609C15.7216 18.7974 15.7216 19.6672 15.1683 20.2037L5.25165 29.8199C4.69841 30.3563 3.80143 30.3563 3.24818 29.8199C2.69494 29.2834 2.69494 28.4136 3.24818 27.8771L13.1649 18.2609C13.7181 17.7245 14.6151 17.7245 15.1683 18.2609Z"
                            fill="white"></path>
                            </svg></a></li>
                    <li>
                        <a href="photo-page.html" class="download-link">
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="icon/file/download_24px">
                            <path id="icon/file/download_24px_2" fill-rule="evenodd" clip-rule="evenodd" d="M21.2499 13.4584H23.5024C24.7633 13.4584 25.3866 14.9884 24.4941 15.8809L17.9916 22.3834C17.4391 22.9359 16.5466 22.9359 15.9941 22.3834L9.49159 15.8809C8.59909 14.9884 9.23659 13.4584 10.4974 13.4584H12.7499V6.37504C12.7499 5.59587 13.3874 4.95837 14.1666 4.95837H19.8333C20.6124 4.95837 21.2499 5.59587 21.2499 6.37504V13.4584ZM8.49992 29.0417C7.72075 29.0417 7.08325 28.4042 7.08325 27.6251C7.08325 26.8459 7.72075 26.2084 8.49992 26.2084H25.4999C26.2791 26.2084 26.9166 26.8459 26.9166 27.6251C26.9166 28.4042 26.2791 29.0417 25.4999 29.0417H8.49992Z" fill="white"></path>
                            </g>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>`;
                    let downloadLink = document.querySelectorAll('.download-link');
                    downloadLink.forEach(elem => {
                        elem.addEventListener('click', () => {
                            sessionStorage.removeItem('imageUrl');
                            sessionStorage.removeItem('imageUser');
                            sessionStorage.removeItem('userName');
                            sessionStorage.removeItem('userLink');
                            sessionStorage.setItem('imageUrl', elem.parentElement.parentElement.parentElement.previousElementSibling.src);
                            sessionStorage.setItem('imageUser', elem.parentElement.parentElement.parentElement.firstChild.children[0].src);
                            sessionStorage.setItem('userName', elem.parentElement.parentElement.parentElement.children[1].innerText);
                            sessionStorage.setItem('userLink', elem.parentElement.parentElement.parentElement.children[2].href);

                        });
                    });
                }
            }

        }

    }
}

function favoriteParse(elements) {
    elements.forEach(elem => {
        return elem;
    })
}

window.addEventListener('DOMContentLoaded', () => {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    if (content) {
        makeApiRequest(apiUrl);
    }
    let newApiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&query=${sessionStorage.getItem('query')}&count=${count}`;
    if (photoPage) {
        makeApiRequestInner(newApiUrl);
    }
    headerLink.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.innerText == 'View all') {
                link.innerText = '';
            }
            apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&query=${link.innerText}&count=${count}`;
            e.preventDefault();
            if (content) {
                makeApiRequest(apiUrl);
            }
            content.classList.remove('layout-list');
        });
    });

    //Поиск фото по нажатию на enter
    let arr = [];
    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&query=${searchInput.value}&count=${count}`;
            if (e.keyCode == 13) {
                arr = JSON.parse(localStorage.getItem('search')) || [];
                let str = searchInput.value.split(" ").map(e => e[0].toUpperCase() + e.slice(1)).join(" ");
                arr.push(str);
                localStorage.setItem('search', JSON.stringify(arr));
                searchInput.value = 'Поиск';
                makeApiRequest(apiUrl);
            }
        });
        searchInput.addEventListener('mouseover', () => {
            searchInput.nextElementSibling.style.opacity = '1';
        });
        searchInput.addEventListener('mouseleave', () => {
            searchInput.nextElementSibling.style.opacity = '0';
        });
    }
    //Получение списка поисковых запросов
    let searchList = JSON.parse(localStorage.getItem("search"));
    let searchBlock = document.createElement('ul');
    if (searchBottom) {
        searchBottom.appendChild(searchBlock);
    }
    if (searchList) {
        searchList.forEach(elem => {
            let searchItem = document.createElement('li');
            searchItem.innerHTML = elem;
            searchBlock.appendChild(searchItem);
        });
    }


    //
    if (photoPage) {
        apiUrlPage = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=1`;
        photoPageApiRequest(apiUrlPage);
    }
    //Кнопки переключения сетки отображения 
    if (layoutListBtn) {
        layoutListBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (content) {
                content.classList.add('layout-list');
            }
            if (favoritesContent) {
                favoritesContent.classList.add('layout-list');
            }
        });
    }
    if (layoutGridBtn) {
        layoutGridBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (content) {
                content.classList.remove('layout-list');
            }
            if (favoritesContent) {
                favoritesContent.classList.remove('layout-list');
            }
        });
    }

    //Добавление избранных фото на страницу избранного
    addToFavoritesBlock('favoriteImages');

});
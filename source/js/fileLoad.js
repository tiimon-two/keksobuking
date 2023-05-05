const FILE_TYPES_AVATAR = ['gif', 'jpg', 'jpeg', 'png'];
const FILE_TYPES_PHOTO = ['jpg', 'jpeg', 'png'];

const avatarInput = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview');

avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES_AVATAR.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPreview.children[0].src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

const photoInput = document.querySelector('.ad-form__input');
const photoPreview = document.querySelector('.ad-form__photo');

photoInput.addEventListener('change', () => {
  const file = photoInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES_PHOTO.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      if (photoPreview.children.length == 0) {
        const photo = document.createElement('img');
        photo.width = 70;
        photo.height = 70;
        photoPreview.appendChild(photo);
      }
      photoPreview.children[0].src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

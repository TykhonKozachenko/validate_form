'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be declared`, () => {
    expect(validateRegisterForm)
      .toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    expect(typeof validateRegisterForm('test@mail.com', 'P@ssword1!'))
      .toBe('object');
  });

  it(`should return success message for the valid inputs`, () => {
    const isValid = validateRegisterForm(
      'test@mail.com',
      'P@ssword1!'
    );

    expect(isValid.code)
      .toBe(200);

    expect(isValid.message)
      .toBe('Email and password are valid.');
  });

  it(`should return success message for the pass at least 8 chars`, () => {
    const isValidCredentials
      = validateRegisterForm(
        'TESTEMAIL@gmail.com',
        'Test12**'
      );

    expect(isValidCredentials.code)
      .toBe(200);

    expect(isValidCredentials.message)
      .toBe('Email and password are valid.');
  });

  it(`should return success message for the pass with max chars`, () => {
    const isValidMaxPassword
     = validateRegisterForm(
       'Email12@gmail.com',
       'Test12**qwerasdf'
     );

    expect(isValidMaxPassword.code)
      .toBe(200);

    expect(isValidMaxPassword.message)
      .toBe('Email and password are valid.');
  });

  it(`should return succes message for valid email]
  and password with Cyrillic char`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com',
      'P#s1!пароль'
    );

    expect(invalidPassword.code)
      .toBe(200);

    expect(invalidPassword.message)
      .toBe('Email and password are valid.');
  });

  it(`should return error for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com',
      'P@ssword'
    );

    expect(invalidPassword.code)
      .toBe(422);

    expect(invalidPassword.message)
      .toBe('Password is invalid.');
  });

  it(`should return error if pass length < 8`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com',
      'P@s1!'
    );

    expect(invalidPassword.code)
      .toBe(422);

    expect(invalidPassword.message)
      .toBe('Password is invalid.');
  });

  it(`should return error if pass length > 16`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com',
      'P@ssword12345678!'
    );

    expect(invalidPassword.code)
      .toBe(422);

    expect(invalidPassword.message)
      .toBe('Password is invalid.');
  });

  it(`should return error if missed 1 digit, 1 special `
  + `character, 1 uppercase letter in password`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com',
      'password'
    );

    expect(invalidPassword.code)
      .toBe(422);

    expect(invalidPassword.message)
      .toBe('Password is invalid.');
  });

  it(`should return error for valid password and email without letters`, () => {
    const invalidPassword
      = validateRegisterForm(
        '***&&&&&@!!!!.)))',
        'P@sswor2d'
      );

    expect(invalidPassword.code)
      .toBe(422);

    expect(invalidPassword.message)
      .toBe('Email is invalid.');
  });

  it(`should return error if the email starts with '.'`, () => {
    const invalidEmail = validateRegisterForm(
      '.tst@mail.com',
      'P@ssword1!'
    );

    expect(invalidEmail.code)
      .toBe(422);

    expect(invalidEmail.message)
      .toBe('Email is invalid.');
  });

  it(`should return error if the top `
    + `level domain email starts with '.'`, () => {
    const invalidEmail = validateRegisterForm(
      'tst@.mail.com',
      'P@ssword1!'
    );

    expect(invalidEmail.code)
      .toBe(422);

    expect(invalidEmail.message)
      .toBe('Email is invalid.');
  });

  it(`should return error if the email includes ':'`, () => {
    const invalidEmail = validateRegisterForm(
      't:st@mail.com',
      'P@ssword1!'
    );

    expect(invalidEmail.code)
      .toBe(422);

    expect(invalidEmail.message)
      .toBe('Email is invalid.');
  });

  it(`should return error for pass without uppercase letter 
  and email without special caracter`, () => {
    const invalidPassword = validateRegisterForm(
      'testmail.com',
      'i2@ssword'
    );

    expect(invalidPassword.code)
      .toBe(500);

    expect(invalidPassword.message)
      .toBe('Password and email are invalid.');
  });

  it(`should return error if email includes double '.'`, () => {
    const invalidPassword = validateRegisterForm(
      'te..st@name.com',
      'Passwor@1'
    );

    expect(invalidPassword.code)
      .toBe(422);

    expect(invalidPassword.message)
      .toBe('Email is invalid.');
  });

  it(`should return error for email without @ char`, () => {
    const invalidPassword = validateRegisterForm(
      'testmail.com',
      'Passwor@1'
    );

    expect(invalidPassword.code)
      .toBe(422);

    expect(invalidPassword.message)
      .toBe('Email is invalid.');
  });

  it(`should return error for email with special char`, () => {
    const invalidPassword = validateRegisterForm(
      'test#@mail.com',
      'Passwor@1'
    );

    expect(invalidPassword.code)
      .toBe(422);

    expect(invalidPassword.message)
      .toBe('Email is invalid.');
  });

  it(`should return error for email with Cyrillic char`, () => {
    const invalidPassword = validateRegisterForm(
      'привіт@mail.com',
      'Passwor@1'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });
});

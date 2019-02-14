import { Leaf } from '../objects/Leaf'

export class ObjectLeaf extends Leaf<object> {
   _data: object;

  constructor(initialData: object){
    super(initialData);
  }

  public execute(): void {
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'pushserver.designpatterns@gmail.com',
        pass: 'Biedroneczka'
      }
    });

    var mailOptions = {
      from: 'pushserver.designpatterns@gmail.com',
      to: 'design_patterns@o2.pl',
      subject: this._data.disasterType,
      html: '<h1>'+this._data.disasterType+'<h1> <h2> level: '+this._data.level+'<h2><h2> kraj: '+this._data.country+'<h2><h2> miasta: '+this._data.city+'<h2>'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

}

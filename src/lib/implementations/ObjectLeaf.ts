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
        user: 'biusiakakum@gmail.com',
        pass: ''
      }
    });

    var mailOptions = {
      from: 'biusiakakum@gmail.com',
      to: 'paulina333.97@o2.pl',
      subject: this._data.disasterType,
      html: '<h1>'+this._data.disasterType+'<h1> i inne dane'
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

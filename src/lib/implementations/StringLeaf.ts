import { Leaf } from '../objects/Leaf'

export class StringLeaf extends Leaf<String> {
   _data: String;

  constructor(initialData: String){
    super(initialData);
  }

  public execute(): void {

    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'biusiakakum@gmail.com',
        pass: 'Koliber123'
      }
    });

    var mailOptions = {
      from: 'biusiakakum@gmail.com',
      to: 'paulina333.97@o2.pl',
      subject: this._data,
      html: '<h1>'+this._data+'<h1>'
    };

  //  transporter.sendMail(mailOptions, function(error, info){
  //    if (error) {
  //      console.log(error);
  //    } else {
  //      console.log('Email sent: ' + info.response);
  //    }
  //  });
  //  console.log(this._data);
  }

}

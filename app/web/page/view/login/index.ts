import { Vue, Component, Prop } from 'vue-property-decorator';
import '../../css/common.css';

export default class Login extends Vue {
  username: string = 'admin';
  remenber: boolean = false;

  login() {
    this.$http.post('/api/user/login', { userName: this.username }).then(res => {
      if(res.data > 0){
        location.href ='/edit/'+res.data
      }else{
        alert("登陆失败！")
      }
    });
  }
}
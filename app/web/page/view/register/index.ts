import { Vue, Component } from 'vue-property-decorator';
import '../../css/common.css';

@Component
export default class Detail extends Vue {
    username: string = 'admin';

    register() {
        this.$http.post('/api/user/register', { userName: this.username }).then(res => {
            if(res.data){
                location.href="/"
            }else{
                alert("用户已存在！")
            }
        });
    }
}
import { Vue, Component } from 'vue-property-decorator';
import '../../css/common.css';

@Component
export default class Edit extends Vue {
    username: string = 'admin';
    id: number = 0;
  
    created(){
        this.id = Number(this.$route.params.id)
    }

    edit() {
      this.$http.put('/api/user/edit', { id:this.id, userName: this.username }).then(res => {
        if(res.data){
            alert("修改成功！")
          }else{
            alert("修改失败！")
          }
      });
    }
}
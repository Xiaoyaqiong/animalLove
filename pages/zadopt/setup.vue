<template>
	<view class="postarticle ">
		<!-- 匹配手机端，腾出手机状态栏的高度，防止手机状态栏遮拦内容 -->
		<view class="status_bar" style="height: var(--status-bar-height); width: 100%;"></view>
		<view class="cu-bar">
			<u-icon name="close" size="20" color="#989898" @click="goBackToorder"></u-icon>
			<view class="btn"><button class="release flex  align-center  justify-center" @tap="showModal"
					data-target="DialogModal1">发布</button></view>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<!-- <view class="action" @tap="hideModal('1')">
						<text class="cuIcon-close text-orange">X</text>
					</view> -->
					<u-icon name="close" size="20" color="#989898" @click="goBackToorder"></u-icon>
				</view>
				<view class="padding-xl text-lg">
					是否确认发布
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn" @tap="hideModal('ca')">取消</button>
						<button class="cu-btn bg-orange margin-left" @tap="hideModal('yes')">确定</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in imagesUrl" :key="index" @tap="ViewImage"
					:data-url="imagesUrl[index]">
					<image :src="imagesUrl[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
						<u-icon name="close" size="10rpx" color="#fff"></u-icon>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="imagesUrl.length<6">
					<u-icon class="plus" name="plus" size="1.5rem"></u-icon>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white ">
			<view class="biaoti title">
				<u--input type="text" border="surround" placeholder="填写博人眼球的标题吧~" v-model="title"></u--input>
			</view>
		</view>
		<!-- <view class="idea">把你的想法分享给全世界</view> -->
		<view class="cu-form-group margin-top">
				<textarea  :disabled="modalName!=null" placeholder="添加正文" @input="textareaAInput"
					v-model="articleContent"></textarea>
		</view>
		<div class="chooseinfo">
    <u-form labelPosition="left" :model="PetModal" errorType="message" ref="form1">
      <u-form-item label="类型" :border-bottom="true">
        <div class="flex u-flex-around btn-group">
          <button 
            class="pet-btn"
            :class="{ 'active': PetModal.petType === 1 }"
            @click="setPet('petType', 1)"
          >
            喵喵
          </button>
          <button 
            class="pet-btn"
            :class="{ 'active': PetModal.petType === 2 }"
            @click="setPet('petType', 2)"
          >
            汪汪
          </button>
          <button 
            class="pet-btn"
            :class="{ 'active': PetModal.petType === 3 }"
            @click="setPet('petType', 3)"
          >
            其他
          </button>
        </div>
      </u-form-item>
      <u-form-item label="性别" :border-bottom="true">
        <div class="flex btn3">
          <button 
            class="gender-btn"
            :class="{ 'active': PetModal.petSex === 0 }"
            @click="setPet('petSex', 0)"
          >
            男
          </button>
          <button 
            class="gender-btn"
            :class="{ 'active': PetModal.petSex === 1 }"
            @click="setPet('petSex', 1)"
          >
            女
          </button>
        </div>
      </u-form-item>
      <u-form-item label="年龄" :border-bottom="true">
        <div class="flex btn3">
          <button 
            class="age-btn"
            :class="{ 'active': PetModal.petAge === '0~3个月' }"
            @click="setPet('petAge', '0~3个月')"
          >
            0~3月
          </button>
          <button 
            class="age-btn"
            :class="{ 'active': PetModal.petAge === '0~1岁' }"
            @click="setPet('petAge', '0~1岁')"
          >
            0~1岁
          </button>
          <button 
            class="age-btn"
            :class="{ 'active': PetModal.petAge === '1~3岁' }"
            @click="setPet('petAge', '1~3岁')"
          >
            1~3岁
          </button>
          <button 
            class="age-btn"
            :class="{ 'active': PetModal.petAge === '3岁以上' }"
            @click="setPet('petAge', '3岁以上')"
          >
            3岁以上
          </button>
        </div>
      </u-form-item>
    </u-form>
  </div>


	</view>

</template>

<script>
	import myhttp from '../../api/myhttp.js'
	import config from '../../api/config.js'
	export default {
		data() {
			return {
				modalName: null,
				imagesUrl: [], //本地图片地址
				articleContent: "",
				createTime: '',
				coverUrl: '',
				title: '',
				// 宠物模型
				PetModal: {
					petType: null,
					petAge: '',
					petSex: null,

				},
				picture: [] //后端图片地址

			}
		},
		methods: {

			//  设置领养的宠物信息
			setPet(type, value) {
				console.log(type, value)
				if (type == 'petType') {
					this.PetModal.petType = value
				} else if (type == 'petSex') {
					this.PetModal.petSex = value
				} else if (type == 'petAge') {
					this.PetModal.petAge = value
				}
			},
			
			// //判断指定字段是否为空，若存在为空返回true
			checkNull() {
				if (this.articleContent != '' && this.title != '' && this.PetModal.petType !== null 
				&&this.PetModal.petAge !== ''&& this.PetModal.petSex !== null
				 ) {
					
					return false;
				} 
				uni.showToast({
					title: '请检查是否筛选且内容是否为空',
					icon: 'error'
				});
				return true;
				
				// return this.PetModal.petSex === null
				
				// Object.keys(this.PetModal).forEach((i) => {
				// 	if(typeof(this.PetModal[i])==null){
				// 		this.PetModal[i] != null
				// 	}
				// 	isEmpty=this.PetModal[i] != null && this.PetModal[i].length!==0
				// })
				// return isEmpty
			},
			// 获取输入内容
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			// 选择照片上传
			ChooseImage() {
				let that = this
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						// console.log(res.tempFilePaths, 'tempFilePaths');
						if (that.imagesUrl.length != 0) {
							that.imagesUrl = that.imagesUrl.concat(res.tempFilePaths)
						} else {
							that.imagesUrl = res.tempFilePaths
						}
					}
				}, );
			},
			// 照片上传
			uploadFile() {
				let that = this;
				console.log(that.imagesUrl, 'that.imagesUrl[0]');
				if (that.checkNull()) {
					return
				}
				that.imagesUrl.forEach((item) => {
					console.log(item);
					uni.uploadFile({
						url: 'http://127.0.0.1:8888/file/uploads', //仅为示例，非真实的接口地址
						filePath: item,
						name: 'file',
						success: (res) => {
							// console.log(res,'resfir');//返回两条object
							if (res.statusCode == 200) {
								// that.picture=res.data
								that.picture.push(res.data)
								console.log(that.picture, 'picin');
								return that.picture
							}

						}
					});
				})
				// that.picture=that.picture.toString()
				// that.picture.JSON.stringify()
				// 先执行了这个
				// console.log(that.picture,'picup');//所以是空的
			},
			// 上传图片
			// uploadFile() {
			// 	// let files = []
			// 	// this.picture.tempFiles.forEach(item => {
			// 	// 	console.log(item.path);
			// 	// 	files.push({
			// 	// 		"name": item.name,
			// 	// 		"uri":item.path
			// 	// 	})
			// 	// })
			// 	let pictureList
			// 	this.picture2=this.picture.tempFiles
			// 	pictureList = JSON.stringify(this.picture2);
			// 	console.log(this.picture2,'pictureList');
			// 	uni.uploadFile({
			// 		url: 'http://10.23.83.140:8080/file/uploads', //仅为示例，非真实的接口地址
			// 		files:files,
			// 		// formData:
			// 		success: (res) => {
			// 			console.log(res);
			// 		}
			// 	});
			// },
			// 取消图片上传
			DelImg(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除照片吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imagesUrl.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			// 图片预览
			ViewImage(e) {
				uni.previewImage({
					urls: this.imagesUrl,
					current: e.currentTarget.dataset.url
				});
			},
			// 返回上一页
			goBackToorder() {
				uni.navigateBack({
					delta: 1
				})
				this.$store.state.adopt.adoptList=[]
				this.$store.state.adopt.filterList={}
				this.$store.dispatch("getArticles")
			},
			// 弹出是否发布框
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			// 发布框确认
			hideModal(str) {
				let that = this
				// console.log(str);
				that.modalName = null
				if (str === 'yes') {
					async function waitload() {
						await that.uploadFile()
						// await that.picture!=''
						that.addArticle()
					}
					waitload()
					that.imagesUrl = []
					that.picture = []
					
				}
			

			},
			// 添加文本内容
			addArticle: function(e) {
				setTimeout(() => {
					let that = this;
					if (that.checkNull()) {
						return
					}
					console.log(that.picture, 'picture2');
					that.$myhttp.post('/users/pets/Adopt/insertAdoptPet', {
						"ageYear": that.PetModal.petAge,
						"gender": that.PetModal.petSex,
						"image": that.picture,
						"introduce": that.articleContent,
						"petName": that.PetModal.petName,
						"petVarietyId": that.PetModal.petType,
						"title": that.title
					}).then(res => {
						console.log(res);
						uni.showToast({
							title:res.msg,
							
						})
						
					})
				}, 1000)
				setTimeout(()=>{
					this.goBackToorder()
				},2000)
				
						
				// uni.request({
				// 	url: that.$baseUrl + "/users/articles/addArticle",
				// 	method: 'POST',
				// 	data: {
				// 		articleContent: that.articleContent,
				// 		coverUrl: that.coverUrl,
				// 		createTime: that.createTime,
				// 		imagesUrl: that.imagesUrl,
				// 	},
				// 	header: {
				// 		'Authorization': that.$store.state.token
				// 	},
				// 	success(res) {
				// 		console.log(res)
				// 		// 验证是否成功
				// 		if (res.data.status != '200') {
				// 			uni.showToast({
				// 				title: res.data.msg,
				// 				icon: 'fail'
				// 			});
				// 		} else {
				// 			uni.showToast({
				// 				title: res.data.msg,
				// 				icon: 'success'
				// 			});

				// 		}
				// 	},
				// 	fail: (err) => {
				// 		console.error(err);

				// 	},
				// });



			},
		},
		onLoad(option) {
			console.log(option,'option');
			if(option.flag){
				return
			}else{
				const item = JSON.parse(decodeURIComponent(option.item))
				console.log(item.name,'item')
				this.articleContent=item.name
			}
			
			// this.articlesUrl=item.articleUrl
			// this.articleId=item.id
			// var pages = getCurrentPages();
			// console.log(pages,'getCurrentPages');
		},
	}
</script>

<style lang="scss">
	@import 'setup.scss';
</style>

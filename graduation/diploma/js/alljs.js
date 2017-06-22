/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-04-12 15:49:37
 * @version $Id$
 */
     // 顶部购物车图标
     // 数量的变化
    function Shop_(){

      var allnum=0;
      $('.cart_num').each(function(index, el) {
      var num=+$(this).find(".li_num").text();
      allnum+=num;
      });
      $(".cart .allnum").text(allnum);

    }  
    // 删除按钮
    	$(".n_empty").on("click",".cart_num .close",function(event) {
          $(this).parent().fadeOut(function(){
            $(this).remove();
            if($(".n_empty ol li").length==0){
               $(".empty").show();
               $(".n_empty").hide();
             }
             Shop_();
          });
             var shop_id=$(this).parent().find(".shop_id").val();
             var shop_sku_id=$(this).parent().find(".shop_sku_id").val();
             deletShop(shop_id,shop_sku_id);
       });
    // 读取保存的数据
    function getlocalStorage(name){
            if(!localStorage.getItem(name)){
              var shop=[];
                  return shop;
          }else{
            var shop=localStorage.getItem(name);
                shop=eval('(' + shop + ')');;
                return shop;
          }
    }
     // 保存数据
    function setlocalStorage(name,value){
          value=JSON.stringify(value);
          // console.log(value);
          localStorage.setItem(name,value);
    }
        // 购物车的列表
    function getcart(){
        var shop=getlocalStorage("shop");
        if(shop.length>0){
               $(".n_empty").show();
               $(".empty").hide();
               var arr=[];
               for(var n=0;n<shop.length;n++){
                   arr.push('<li class="cart_num">'
                        +'<img src="'+shop[n]["shop_img"]+'" alt="">'
                        +'<input type="hidden" class="shop_id" value="'+shop[n]["shop_id"]+'">'
                        +'<input type="hidden" class="shop_sku_id" value="'+shop[n]["shop_sku_id"]+'">'
                        +'<div class="cart_xq">'
                           +'<a href="">'+shop[n]["shop_name"]+'</a>'
                           +'<h6>'+shop[n]["shop_color"]+'</h6>'
                           +'<p>'
                            +'<span class="fuh">￥</span><span class="li_price">'+shop[n]["shop_price"]+'</span>'
                             +'<span class="fuhs">x</span><span class="li_num">'+shop[n]["shop_num"]+'</span>'
                        +'</p>'
                        +'</div>'
                        +'<div class="close">x</div>'
                    +'</li>')
               }
              $(".n_empty ol").html(arr.join('')); 
              Shop_();
        }else{ 
          $(".empty").show();
          $(".n_empty").hide();
        }
    }
    getcart();

    // 添加商品
    function addshop(shop_xq){
        var shop=getlocalStorage("shop");
          var flag=true;
          if(shop.length>0){
            var shop=getlocalStorage("shop");
                for(var n=0;n<shop.length;n++){
                  if(shop_xq["shop_id"]==shop[n]["shop_id"]){
                    if(shop_xq["shop_sku_id"]==shop[n]["shop_sku_id"]){
                        flag=false;
                        var equ=n;
                        break;
                    }
                  }
                }
          }
         if(!flag){
          shop[equ]["shop_num"]=+shop[equ]["shop_num"]+(+shop_xq['shop_num']);
          setlocalStorage("shop",shop);
         }else{
            shop.push(shop_xq);
           setlocalStorage("shop",shop);
         }       
         getcart(); 
    }
  // 删除商品
    function deletShop(shop_id,shop_sku_id){
            var shop=getlocalStorage("shop");
                for(var n=0;n<shop.length;n++){
                  if(shop_id==shop[n]["shop_id"]){
                    if(shop_sku_id==shop[n]["shop_sku_id"]){
                          shop.splice(n,1);
                        console.log("成功删除");
                        break;
                    }
                  }
                }
       setlocalStorage("shop",shop);
    }
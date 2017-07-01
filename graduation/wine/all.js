/**
 * 头放大镜效果
 * @authors Your Name (you@example.org)
 * @date    2016-12-12 17:14:42
 * @version $Id$
 */

	var cnt=0,
		arr=[
			{
				width: 0,
				paddingLeft: 0,
				paddingRight: 0
			},
			{
				width: 200,
				paddingLeft: 15,
				paddingRight: 15
			}
		];
	$(".search button").click(function(event) {
		cnt++;
		$(".search .form-group input").animate(arr[cnt%2]);
		event.preventDefault();
	});

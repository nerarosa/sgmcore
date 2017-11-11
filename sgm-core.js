/* jshint browser: true */
/* global define, $, JSLINT, brackets */

var DEFAULT_THUMB = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXMzMzKUkQnAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';
const GG_API_KEY = "AIzaSyAgi7eyJY7T5TZY7iNp0KNQAa6NG67CbYo";

/* device detection*/
var isMobile = false; //initiate as false
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

/*get Marked data*/
function sgmTags(tagname, content){
	var openTag = "[" + tagname + "]",
		closeTag = "[/" + tagname + "]",
		startIndex = content.indexOf(openTag) + (tagname.length + 2),
		endIndex = content.indexOf(closeTag),
		result = "";
	
	if(content.indexOf(openTag) != -1)
		result = content.substring(startIndex, endIndex);	
		
	return result;
}

/*Check is interger*/
function isInt(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
}

function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
}

function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}

function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input !== null && Object.prototype.toString.call(input) === '[object Object]';
}

function isObjectEmpty(obj) {
    if (Object.getOwnPropertyNames) {
        return (Object.getOwnPropertyNames(obj).length === 0);
    } else {
        var k;
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    }
}

function isUndefined(input) {
    return input === void 0;
}

function absRound (number) {
    if (number < 0) {
        return Math.round(-1 * number) * -1;
    } else {
        return Math.round(number);
    }
}

function absCeil (number) {
    if (number < 0) {
        return Math.floor(number);
    } else {
        return Math.ceil(number);
    }
}

function absFloor (number) {
    if (number < 0) {
        return Math.ceil(number) || 0;
    } else {
        return Math.floor(number);
    }
}

function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = absFloor(coercedNumber);
    }

    return value;
}

/*fix url domain*/
function imageHostFix(url, nofix){
	if(nofix === undefined) nofix = false;
	if(url.indexOf('googleusercontent.com') != -1 )
		return url;
	
	if(url.indexOf('1.bp.blogspot.com') != -1 || url.indexOf('3.bp.blogspot.com') != -1){
		url = url.replace(/[1|3]\.bp\.blogspot\.com/, 'lh3.googleusercontent.com');
	}else if(url.indexOf('2.bp.blogspot.com') != -1 || url.indexOf('4.bp.blogspot.com') != -1){
		url = url.replace(/[2|4]\.bp\.blogspot\.com/, 'lh4.googleusercontent.com');
	}else if(!nofix){
		url = "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&amp;refresh=31536000&amp;url=" + encodeURIComponent(url);
	}
	
	return url;
}

/*resize image*/
function resizeImg(url, size){
	/*
		size:{
			"w": New Width,
			"h": New Height,
			"s": New pixels on largest dimension,			
			"crop": - "no" not crops image
					- "c" crops image to provided dimensions
					- "p" smart square crop, attempts cropping to faces
					- "pp" alternate smart square crop, does not cut off faces
					- "cc" generates a circularly cropped image
					- "ci" square crop to smallest of: width, height, or specified =s parameter
					- "nu" no-upscaling. Disables resizing an image to larger than its original resolution
			"rotation": "fv" — flip vertically
						"fh" — flip horizontally
						"r{90, 180, 270}" — rotates image 90, 180, or 270 degrees clockwise
			"convert": "rj" — forces the resulting image to be JPG
					   "rp" — forces the resulting image to be PNG
					   "rw" — forces the resulting image to be WebP
					   "rg" — forces the resulting image to be GIF			
		}
	*/
	if(("w" in size && size.w !== '') || ("h" in size && size.h !== '') || ("s" in size && size.s !== '')){
		let newImg = '';
		if(url.indexOf('googleusercontent.com') != -1 || url.indexOf('bp.blogspot.com') != -1){
			let newWidth = '',
				newHeight = '',
                newSize = '';
			let quanlity = ("q" in size && size.q !== '') ? "-l" + size.q : "-l90";
			
			if("s" in size && size.s !== ''){
				newSize = "s"+ size.s + (size.crop !== "" ? "-"+size.crop : "") + quanlity + "-e365";
			}else{
				if("w" in size && size.w !== '') newWidth = "w" + size.w + "-";
				if("h" in size && size.h !== '') newHeight = "h" + size.h + "-";
			
				newSize = newWidth + newHeight + (size.crop !== "" ? size.crop : "") + quanlity + "-e365";
			}
			
			if(!/\.(?=(jpg|png|gif|jpeg))/i.test(url)){
				if(url.indexOf('=') != -1)
					newImg = url.replace(/\=.*/g, newSize);
				else
					newImg = url + "=" + newSize;
			}else{
				//newImg = url.replace(/\/s[0-9]{1,4}.*\//g, newSize);
				
				let elUrl = url.split("/");
                
                elUrl.splice(elUrl.length - 2, 1, newSize);
                
                newImg = elUrl.join("/");
			}
			
		}else if(!("nofix" in size)){
			//if("crop" in size && size.crop == 'c'){
				let newWidth = '',
					newHeight = '';
				if("s" in size && size.s !== ''){
					newWidth = newHeight = size.s;
				}else{
					if("w" in size && size.w !== '') newWidth = '&resize_w=' + size.w;
					if("h" in size && size.h !== '') newHeight = '&resize_h=' + size.h;
				}	
				
				newImg = "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=31536000"+ newWidth + newHeight +"&url=" + encodeURIComponent(url);
			/*}else{
				let newWidth = '',
					newHeight = '';
				if("s" in size && size.s !== ''){
					newWidth = newHeight = size.s;
				}else{
					if("w" in size && size.w !== '') newWidth =  size.w;
					if("h" in size && size.h !== '') newHeight = size.h;
				}	
				if(url.indexOf('https://rsz.io/') == -1)
					newImg = "https://rsz.io/"+ url.split('//')[1] + "?w=" + newWidth + "&h=" + newHeight + "&mode=crop";
				else
					newImg = url.split('?')[0] + "?w=" + newWidth + "&h=" + newHeight + "&mode=crop";
			}*/
		}else{
			newImg = url;
		}
			
		return newImg;
	}else{
		return url;
	}
}

function getViewportSize(){
	var w = window, 
		d = document, 
		e = d.documentElement, 
		g = d.getElementsByTagName('body')[0], 
		x = w.innerWidth || e.clientWidth || g.clientWidth, 
		y = w.innerHeight|| e.clientHeight|| g.clientHeight;
	return x+"x"+y;
}

$.fn.isOnScreen = function(){    
    var win = $(window);    
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
	
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
    
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));  
};

function getAjax(options, callback){
	if(typeof options.url === "undefined" || options.url === '' || options.url === null)
		return;
	
	let countLoop = 0,
        defaultSend = {
			"alt":"json-in-script"
		};
    
	if(options.url.indexOf('googleapis.com/blogger') != -1){
        defaultSend = {
			"key": GG_API_KEY
		};
	}
	
	let sendData = {};	
	
	if(typeof options.beforeHandle === "undefined" || !$.isFunction(options.beforeHandle))
		options.beforeHandle = function(){};
	
	if(typeof options.dataSend === "undefined" || typeof options.dataSend !== "object" || $.isEmptyObject(options.dataSend))
		sendData = defaultSend;
	else
		if(options.url.indexOf('blogspot.com') != -1 || options.url.indexOf('/feeds/') != -1 || options.url.indexOf('googleapis.com/blogger') != -1)
			sendData = $.extend({}, defaultSend, options.dataSend);
		else
			sendData = options.dataSend;
	(function _init(){
        countLoop++;
        $.ajax({
            url: options.url,
            type: "get",
            data: sendData,
            dataType: "jsonp",
            beforeSend: options.beforeHandle,
            success: function(data){
                callback(data);
            },
            error: function(e){            
                if(countLoop < 3)
                    _init();
                else{
                    console.log(e);
                    callback('err');
                }
            }
        });   
    })();	
}

function analyzePost(entry, options){
    let result = {};
    if(entry !== undefined){
        if($.inArray('url', options.fields) > -1 ){
            for(let j in entry.link){
                if(entry.link[j].rel == "alternate"){
                    result.url = entry.link[j].href;
                }
            }
        }
        if($.inArray('titlelink', options.fields) > -1 ){
            result.titlelink = '';
            for(let j in entry.link){
                if(entry.link[j].rel == "related"){
                    result.titlelink = entry.link[j].href;
                }
            }
        }
        
        if($.inArray('enclosure', options.fields) > -1 ){
            result.enclosure = [];
            for(let j in entry.link){
                if(entry.link[j].rel == "related"){
                    result.enclosure.push({
                        link: entry.link[j].href,
                        type: entry.link[j].type
                    });
                }
            }
        }
        
        if($.inArray('id', options.fields) > -1){
            result.id = entry.id.$t.split('post-')[1];
        }

        if($.inArray('title', options.fields) > -1){
            result.title = "title" in entry ? entry.title.$t : "";
        }

        if($.inArray('published', options.fields) > -1){
            result.published = options.dateFormat === '' ? entry.published.$t : moment(entry.published.$t).format(options.dateFormat);
        }

        if($.inArray('updated', options.fields) > -1){            
            result.updated = options.dateFormat === '' ? entry.updated.$t : moment(entry.updated.$t).format(options.dateFormat);
        }
        if($.inArray('label', options.fields) > -1){
            let category = "category" in entry ? entry.category : '';
            let cat = [];
            if(category !== ''){
                for(let n in category){
                    cat.push(category[n].term);
                }

                result.labels = cat;
            }
        }
        
        if("content" in entry){
            let content = "content" in entry ? entry.content.$t : '';

            if($.inArray('content', options.fields) > -1){
                result.content = content;
            }

            let thumbnail = '';
            if($.inArray('thumbnail', options.fields) > -1){
                if("media$thumbnail" in entry){
                    thumbnail = options.thumbResize ? resizeImg(entry.media$thumbnail.url, options.thumbSize) : entry.media$thumbnail.url;

                    thumbnail = options.thumbFix ? imageHostFix(thumbnail) : thumbnail;
                }else{
                    if(content.indexOf('<img') != -1){
                        let rex = /<img.*?src="([^">]*\/([^">]*?))".*?>/g;
                        thumbnail = options.thumbResize ? resizeImg(rex.exec(content)[1], options.thumbSize) : rex.exec(content)[1];
                        
                        if(options.thumbResize){                            
                            result.rsstyle = 'object-fit: cover;height: '+ ("h" in options.thumbSize ? options.thumbSize.h : options.thumbSize.s) +'px !important;';
                        }
                        
                        thumbnail = options.thumbFix ? imageHostFix(thumbnail) : thumbnail;
                    }else{
                        thumbnail = DEFAULT_THUMB;
                        
                        if(options.thumbResize){                            
                            result.rsstyle = 'height: '+ ("h" in options.thumbSize ? options.thumbSize.h : options.thumbSize.s) +'px !important;';
                        }
                    }
                }

                result.thumbnail = thumbnail;
            }
        }
        
        if($.inArray('snippet', options.fields) > -1){
            let content = "content" in entry ? entry.content.$t : ("summary" in entry ? entry.summary : "");
            let sum = content.replace(/(<([^>]+)>)/ig,"").trim().replace(/ +(?= )/g,'');
            if(options.snippetlength == 'full')
                result.snippet = sum;
            else    
                result.snippet = sum.length <= options.snippetlength ? sum : sum.substr(0, options.snippetlength);
        }

        if($.inArray('location', options.fields) > -1){
            result.location = "georss$featurename" in entry ? entry.georss$featurename.$t : "";
        }
    }
    
    return result;
}

function randomPost(options, callback){
    let defaults = {
        blogUrl : '',
        label: '',
        beforeHandle: function(){},
        dataSend : {
            "alt":"json-in-script",
            "max-results" : 10                        
        },
        fields : ["id","title","url","thumbnail","snippet","published","updated","label","location","titlelink","enclosure"],
        snippetlength : 150, //full or number
        thumbResize: true,
        thumbSize: {'s':'0',"crop":"no"},
        thumbFix : true,
        render: false,
        renderTemplate:{
            el: '#sgm-render',
            template: '#mustache-template',
            errorText: 'Error!! Try Refresh page!'
        },
        dateFormat: ''
    };
	
    options = $.extend({}, defaults, options);
    
	if(!("alt" in options.dataSend))
        options.dataSend.alt = "json-in-script";
    
    let urlPath = '/feeds/posts/summary';
    
    if($.inArray('thumbnail', options.fields) > -1 || $.inArray('content', options.fields) > -1){
        urlPath = '/feeds/posts/default';
    }
    
    if(options.label != ''){
       urlPath += '/-/' + options.label;
    }
    
    function getTotal(callback1){        
        getAjax({
            url : options.blogUrl === '' ? urlPath : options.blogUrl + urlPath,
            dataSend :{
                "alt":"json-in-script",
                "max-results" : 0
            }
        }, function(data){
            if(data !== 'err'){
               callback1(parseInt(data.feed.openSearch$totalResults.$t, 10));
            }
        })
    }
    
    getTotal(function(total){
        let randomIndex = Math.floor(Math.random() * (total - options.dataSend["max-results"])) + 1;
        
        options.dataSend["start-index"] = randomIndex;
        
        let countLoop = 0;
        (function _init(){
            countLoop++;
            $.ajax({
                url: options.blogUrl === '' ? urlPath : options.blogUrl + urlPath,
                type: "get",
                data: options.dataSend,
                dataType: "jsonp",
                beforeSend: options.beforeHandle,
                success: function(data){
                    let entry = data.feed.entry,
                        result = [];

                    if(entry !== undefined){
                        for(let i = 0, len = entry.length; i < len; i++){
                            result.push(analyzePost(entry[i], options));
                        }
                    }

                    if(options.render){
                        let rendered = 'No Result';
                        if(result.length > 0){
                            let items = {"items" : result};

                            let template = $(options.renderTemplate.template).html();
                            Mustache.parse(template);
                            rendered = Mustache.render(template, items);
                        }

                        $(options.renderTemplate.el).html(rendered);
                        if(isFunction(callback))
                            callback();
                    }else{
                        callback(result);
                    }
                },
                error: function(e){
                    if(countLoop < 3)
                        _init();
                    else{
                        console.log(e);
                        if(options.render){
                            $(options.renderTemplate.el).html('Error! Try refresh page.');
                        }else{
                            callback('err');   
                        }   
                    }				
                }
            });
        })();
    })
    
}

function getDataFeed(options, callback){
    let defaults = {
        blogUrl : '',
        label: '',
        beforeHandle: function(){},
        dataSend : {
            "alt":"json-in-script",
            "max-results" : 150,
            "orderby" : "published",
            "start-index": 1
        },
        fields : ["id","title","url","thumbnail","snippet","published","updated","label","location","titlelink","enclosure"],
        snippetlength : 150, //full or number
        thumbResize: true,
        thumbSize: {'s':'0',"crop":"no"},
        thumbFix : true,
        render: false,
        renderTemplate:{
            el: '#sgm-render',
            template: '#mustache-template',
            errorText: 'Error!! Try Refresh page!'
        },
        dateFormat: ''
    };
	
    options = $.extend({}, defaults, options);
	if(!("alt" in options.dataSend))
        options.dataSend.alt = "json-in-script";
    
    let urlPath = '/feeds/posts/summary';
    
    if($.inArray('thumbnail', options.fields) > -1 || $.inArray('content', options.fields) > -1){
        urlPath = '/feeds/posts/default';
    }
    
    if(options.label != ''){
       urlPath += '/-/' + options.label;
    }
    
	let countLoop = 0;
    (function _init(){
        countLoop++;
        $.ajax({
            url: options.blogUrl === '' ? urlPath : options.blogUrl + urlPath,
            type: "get",
            data: options.dataSend,
            dataType: "jsonp",
            beforeSend: options.beforeHandle,
            success: function(data){
                let entry = data.feed.entry,
                    result = [];

                if(entry !== undefined){
                    for(let i = 0, len = entry.length; i < len; i++){
                        result.push(analyzePost(entry[i], options));
                    }
                }
                
                if(options.render){
                    let rendered = 'No Result';
                    if(result.length > 0){
                        let items = {"items" : result};
                    
                        let template = $(options.renderTemplate.template).html();
                        Mustache.parse(template);
                        rendered = Mustache.render(template, items);
                    }
                    
                    $(options.renderTemplate.el).html(rendered);
                    if(isFunction(callback))
                        callback();
                }else{
                    callback(result);
                }
            },
            error: function(e){
                if(countLoop < 3)
                    _init();
                else{
                    console.log(e);
                    if(options.render){
                        $(options.renderTemplate.el).html('Error! Try refresh page.');
                    }else{
                        callback('err');   
                    }   
                }				
            }
        });
    })();
}

function getOnePost(options,callback){
    let defaults = {
        id: '',
        blogUrl: '',
        snippetlength : 150, //full or number
        thumbSize: {'s':'0',"crop":"no"},
        thumbFix : true,
        fields : ["id","title","url","thumbnail","snippet","content","published","updated","label","location","titlelink","enclosure"],
        beforeHandle: function(){},
        render: false,
        renderTemplate:{
            el: '#sgm-render',
            template: '#mustache-template',
            errorText: 'Error!! Try Refresh page!'
        },
        dateFormat: ''
    };
    
    options = $.extend({}, defaults, options);    
    
    let urlPath = '/feeds/posts/summary/';
    
    if($.inArray('thumbnail', options.fields) > -1 || $.inArray('content', options.fields) > -1){
        urlPath = '/feeds/posts/default/';
    }
    
    getAjax({
        url: options.blogUrl === '' ? urlPath + options.id : options.blogUrl + urlPath + options.id,
        beforeHandle: options.beforeHandle
    }, function(data){
        if(data !== 'err'){
            if(options.render){
                let template = $(options.renderTemplate.template).html();
                Mustache.parse(template);
                let rendered = Mustache.render(template, analyzePost(data.entry, options));
                $(options.renderTemplate.el).html(rendered);
                if(isFunction(callback))
                    callback();
            }else{
                callback(analyzePost(data.entry, options));
            }
        }else{
            if(options.render){
                $(options.renderTemplate.el).html(options.renderTemplate.errorText);
            }else{
                callback(data);   
            }      
        }
    });
}

function analyzePostApi(entry, options){
    let result = {};

    if('id' in entry)
        result.id = entry.id;

    if('url' in entry)
        result.url = entry.url;

    if('title' in entry)
        result.title = entry.title;

    if('published' in entry)
        result.published = options.dateFormat === '' ? entry.published : moment(entry.published).format(options.dateFormat);

    if('updated' in entry)
        result.updated = options.dateFormat === '' ? entry.updated : moment(entry.updated).format(options.dateFormat);

    if('labels' in entry)
        result.labels = entry.labels;

    if('location' in entry)
        result.location = entry.location.name;

    if($.inArray('thumbnail', options.fields) > -1 || $.inArray('snippet', options.fields) > -1 || options.fields.length === 0){
        let content = 'content' in entry ? entry.content : '';

        if($.inArray('thumbnail', options.fields) > -1 || options.fields.length === 0){
            let thumbnail = '';
            if("images" in entry){
                thumbnail = resizeImg(entry.images[0].url, options.thumbSize);

                thumbnail = options.thumbFix ? imageHostFix(thumbnail) : thumbnail;
            }else{
                if(content.indexOf('<img') != -1){
                    let rex = /<img.*?src="([^">]*\/([^">]*?))".*?>/g;
                    thumbnail = resizeImg(rex.exec(content)[1], options.thumbSize);

                    thumbnail = options.thumbFix ? imageHostFix(thumbnail) : thumbnail;
                }else{
                    thumbnail = DEFAULT_THUMB;
                }
            }

            result.thumbnail = thumbnail;
        }

        if($.inArray('snippet', options.fields) > -1 || options.fields.length === 0){
            let sum = content.replace(/(<([^>]+)>)/ig,"").trim().replace(/ +(?= )/g,'');
            if(options.snippetlength == 'full')
                result.snippet = sum;
            else    
                result.snippet = sum.length <= options.snippetlength ? sum : sum.substr(0, options.snippetlength);
        }
    }
    
    return result;
}

function getDataApi(options, callback){
    if(typeof options.blogId === "undefined" || options.blogId === '' || options.blogId === null)
		return;
	
    let defaults = {
        blogId : '9217536117332083683',
        dataSend : {
            "key": GG_API_KEY,
            "fetchImages": false,
            "fetchBodies": false,
            "maxResults" : 500,
            "orderby" : "published",
            //endDate : 2017-07-09T00:26:00+07:00
            //startDate : 2017-07-09T00:26:00+07:00
            //labels : Photo,Sexy
            fields : 'items'
        },
        fields : [], //["id","title","url","thumbnail","snippet","published","updated","label","location"]
        snippetlength : 150, //full or number
        thumbSize: {'s':'0',"crop":"no"},
        thumbFix : true,
        beforeHandle: function(){},
        render: false,
        renderTemplate:{
            el: '#sgm-render',
            template: '#mustache-template',
            errorText: 'Error!! Try Refresh page!'
        },
        dateFormat: ''
    };
	
    options = $.extend({}, defaults, options);
    
    if(options.fields.length > 0){
        let fieldGet = '';
        if($.inArray('id', options.fields) > -1){
           fieldGet += fieldGet === '' ? 'id' : ',id';
        }
        if($.inArray('title', options.fields) > -1){
           fieldGet += fieldGet === '' ? 'title' : ',title';
        }
        if($.inArray('url', options.fields) > -1){
           fieldGet += fieldGet === '' ? 'url' : ',url';
        }
        if($.inArray('published', options.fields) > -1){
           fieldGet += fieldGet === '' ? 'published' : ',published';
        }
        if($.inArray('updated', options.fields) > -1){
           fieldGet += fieldGet === '' ? 'updated' : ',updated';
        }
        if($.inArray('label', options.fields) > -1){
           fieldGet += fieldGet === '' ? 'labels' : ',labels';
        }
        if($.inArray('location', options.fields) > -1){
           fieldGet += fieldGet === '' ? 'location(name)' : ',location(name)';
        }
        
        if($.inArray('thumbnail', options.fields) > -1 || $.inArray('snippet', options.fields) > -1){
            options.dataSend.fetchBodies = true;
            options.dataSend.fetchImages = true;
            fieldGet += fieldGet === '' ? 'images,content' : ',images,content';    
        }
        
        options.dataSend.fields = 'items(' + fieldGet + ')';
    }
        
    if(options.fields.length === 0){
        options.dataSend.fetchBodies = true;
        options.dataSend.fetchImages = true;        
    }
    
    let countLoop = 0;
    (function _init(){
        countLoop++;    
        $.ajax({
            url: 'https://www.googleapis.com/blogger/v3/blogs/'+ options.blogId +'/posts',
            type: "get",
            data: options.dataSend,
            dataType: "jsonp",
            beforeSend: options.beforeHandle,
            success: function(data){
                let result = [];

                if('items' in data){
                    let entry = data.items;

                    for(let i = 0, len = entry.length; i < len; i++){
                        result.push(analyzePostApi(entry[i], options));
                    }
                }
                
                if(options.render){
                    let rendered = 'No Result';
                    if(result.length > 0){
                        let items = {"items" : result};
                    
                        let template = $(options.renderTemplate.template).html();
                        Mustache.parse(template);
                        rendered = Mustache.render(template, items);
                        
                    }
                    $(options.renderTemplate.el).html(rendered);
                    if(isFunction(callback))
                        callback();
                }else{
                    callback(result);
                }
            },
            error: function(e){			
                if(countLoop < 3)
                    _init();
                else{
                    console.log(e);
                    callback('err');   
                }				
            }
        });
    })();
}

function getOnePostApi(options,callback){
    if(typeof options.blogId === "undefined" || options.blogId === '' || options.blogId === null || typeof options.id === "undefined" || options.id === '' || options.id === null)
		return;
    
    let defaults = {
        id: '',
        blogId: '',
        snippetlength : 150, //full or number
        thumbSize: {'s':'0',"crop":"no"},
        thumbFix : true,
        fields : ["id","title","url","thumbnail","snippet","published","updated","label","location"],
        dataSend : {            
            "fetchImages": false,
            "fetchBodies": false,            
            //fields : '(id,title,url)'
        },
        beforeHandle: function(){},
        render: false,
        renderTemplate:{
            el: '#sgm-render',
            template: '#mustache-template',
            errorText: 'Error!! Try Refresh page!'
        },
        dateFormat: ''
    };
    
    options = $.extend({}, defaults, options);
    
    if(options.fields.length > 0){
        let fieldGet = '';
        if($.inArray('id', options.fields) > -1){
           fieldGet += fieldGet === '' ? 'id' : ',id';
        }
        if($.inArray('title', options.fields) > -1){
           fieldGet += fieldGet === '' ? 'title' : ',title';
        }
        if($.inArray('url', options.fields) > -1){
           fieldGet += fieldGet === '' ? 'url' : ',url';
        }
        if($.inArray('published', options.fields) > -1){
           fieldGet += fieldGet === '' ? 'published' : ',published';
        }
        if($.inArray('updated', options.fields) > -1){
           fieldGet += fieldGet === '' ? 'updated' : ',updated';
        }
        if($.inArray('label', options.fields) > -1){
           fieldGet += fieldGet === '' ? 'labels' : ',labels';
        }
        if($.inArray('location', options.fields) > -1){
           fieldGet += fieldGet === '' ? 'location(name)' : ',location(name)';
        }
        
        if($.inArray('thumbnail', options.fields) > -1 || $.inArray('snippet', options.fields) > -1){
            options.dataSend.fetchBodies = true;
            options.dataSend.fetchImages = true;
            fieldGet += fieldGet === '' ? 'images,content' : ',images,content';    
        }
        
        options.dataSend.fields =  fieldGet;
    }
    
    if(options.fields.length === 0){
        options.dataSend.fetchBodies = true;
        options.dataSend.fetchImages = true;
    }
    
    getAjax({
        url: 'https://www.googleapis.com/blogger/v3/blogs/'+ options.blogId +'/posts/' + options.id,
        dataSend: options.dataSend,
        beforeHandle: options.beforeHandle
    }, function(data){
        if(data != 'err'){
            if(!('error' in data)){
                let entryObj = analyzePostApi(data, options);
                if(options.render){
                    let template = $(options.renderTemplate.template).html();
                    Mustache.parse(template);
                    let rendered = Mustache.render(template, entryObj);
                    $(options.renderTemplate.el).html(rendered);
                    if(isFunction(callback))
                        callback();
                }else{
                    callback(entryObj);
                }
            }else{
                callback('err');
            }
        }else{
            if(options.render){
                $(options.renderTemplate.el).html(options.renderTemplate.errorText);
            }else{
                callback(data);   
            }
        }
    });
}

/*Normal Related Post*/
var resultRelated = [],
    idExistRelated = [],
    settingsRelated = {};
function getData(data){
    let entry = data.feed.entry;
    
    if(entry !== undefined){
        let id = '',
            thumbnail = '',
            count = 1;
        
        for(let i = 0, len = entry.length; i < len; i++){
            let labelResult = {};
            
            if(resultRelated.length == settingsRelated.max) return;
            if(count == settingsRelated.maxInLabel) break;

            id = entry[i].id.$t.split('post-')[1];
            if($.inArray(id, idExistRelated) > -1 || id == settingsRelated.idPost) continue;

            if($.inArray('url', settingsRelated.fields) > -1 ){
                for(let j in entry[i].link){
                    if(entry[i].link[j].rel == "alternate"){
                        labelResult.url = entry[i].link[j].href;
                    }
                }
            }
            if($.inArray('id', settingsRelated.fields) > -1){
                labelResult.id = id;
            }

            if($.inArray('title', settingsRelated.fields) > -1){
                labelResult.title = "title" in entry[i] ? entry[i].title.$t : "";
            }

            if($.inArray('published', settingsRelated.fields) > -1){                
                labelResult.published = settingsRelated.dateFormat === '' ? entry[i].published.$t : moment(entry[i].published.$t).format(settingsRelated.dateFormat);
            }

            if($.inArray('updated', settingsRelated.fields) > -1){                
                labelResult.updated = settingsRelated.dateFormat === '' ? entry[i].updated.$t : moment(entry[i].updated.$t).format(settingsRelated.dateFormat);
            }
            if($.inArray('label', settingsRelated.fields) > -1){
                let category = "category" in entry[i] ? entry[i].category : '';
                let cat = [];
                if(category !== ''){
                    for(let n in category){
                        cat.push(category[n].term);
                    }

                    labelResult.labels = cat;
                }
            }

            let content = "content" in entry[i] ? entry[i].content.$t : '';
            if($.inArray('thumbnail', settingsRelated.fields) > -1){
                if("media$thumbnail" in entry[i]){
                    thumbnail = resizeImg(entry[i].media$thumbnail.url, settingsRelated.thumbSize);

                    thumbnail = settingsRelated.thumbFix ? imageHostFix(thumbnail) : thumbnail;
                }else{
                    if(content.indexOf('<img') != -1){
                        let rex = /<img.*?src="([^">]*\/([^">]*?))".*?>/g;
                        thumbnail = resizeImg(rex.exec(content)[1], settingsRelated.thumbSize);

                        thumbnail = settingsRelated.thumbFix ? imageHostFix(thumbnail) : thumbnail;
                    }else{
                        thumbnail = DEFAULT_THUMB;
                    }
                }
                
                labelResult.thumbnail = thumbnail;
            }

            if($.inArray('snippet', settingsRelated.fields) > -1){
                let sum = content.replace(/(<([^>]+)>)/ig,"").trim().replace(/ +(?= )/g,'');
                if(settingsRelated.snippetlength == 'full')
                    labelResult.snippet = sum;
                else    
                    labelResult.snippet = sum.length <= settingsRelated.snippetlength ? sum : sum.substr(0, settingsRelated.snippetlength);
            }

            if($.inArray('location', settingsRelated.fields) > -1){
                labelResult.location = "georss$featurename" in entry[i] ? entry[i].georss$featurename.$t : "";
            }

            idExistRelated.push(id);
            resultRelated.push(labelResult);
            count++;
        }        
    }
}

function getRelated(options, callback){
    let defaults = {
        labels: [],
        maxGet : 12,
		maxInLabel : 5,
		max : 20,
        idPost : '',
        snippetlength : 150, //full or number
        thumbSize: {'s':'0',"crop":"no"},
        thumbFix : true,
        fields : ["id","title","url","thumbnail","snippet","published","updated","label","location"],
        render: false,
        renderTemplate:{
            el: '#sgm-render',
            template: '#mustache-template',
            errorText: 'Error!! Try Refresh page!'
        },
        dateFormat: ''
    };
    
    settingsRelated = $.extend({}, defaults, options);
    
    (function() {
        for(let i in settingsRelated.labels){
            var po = document.createElement('script'); 
                po.type = 'text/javascript'; 
                po.async = true;
                po.src = 'https://sexygirlmedia.blogspot.com/feeds/posts/default/-/' + settingsRelated.labels[i] + '?alt=json-in-script&max-results=' + settingsRelated.maxGet + '&callback=getData';

            document.getElementsByTagName('body')[0].appendChild(po);
        }
    })();
    
    let rangerInit = 1;
    (function _init(){
        rangerInit++;
        if(rangerInit <= 3){
            setTimeout(function(){            
                if(resultRelated.length === 0)
                    _init();
                else{
                    if(settingsRelated.render){        
                        let rendered = 'No Result';
                        if(resultRelated.length > 0){
                            let items = {"items" : resultRelated};

                            let template = $(settingsRelated.renderTemplate.template).html();
                            Mustache.parse(template);
                            rendered = Mustache.render(template, items);
                        }
                        $(settingsRelated.renderTemplate.el).html(rendered);
                        if(isFunction(callback))
                            callback();
                    }else{
                        callback(resultRelated);
                    }
                }            
            },1000);  
        }        
    })();
}

/*Get related Ajax*/
function getRelatedAjax(options, callback){
    let defaults = {
        labels: [],
        mainLabel : '',
        maxGet : 12,
		maxInLabel : 5,
		max : 20,
        idPost : '',
        snippetlength : 150, //full or number
        thumbSize: {'s':'0',"crop":"no"},
        thumbFix : true,
        fields : ["id","title","url","thumbnail","snippet","published","updated","label","location","titlelink","enclosure"],
        render: false,
        renderTemplate:{
            el: '#sgm-render',
            template: '#mustache-template',
            errorText: 'Error!! Try Refresh page!'
        },
        dateFormat: ''
    };
	
    options = $.extend({}, defaults, options);
    
	function getJSON(url) {
		var requestPromise = new Promise(function(resolve, reject) {
			$.ajax({
				url: url,
				data: {
					"max-results": options.maxGet,
					alt: "json-in-script"
				},
				dataType: "jsonp",
				success: function(e) {
					var entry = e.feed.entry;
					if(entry !== undefined){
						resolve(entry);						
					}
				},
				error: function(e){
					reject(e);
				}
			});
		});

	  return Promise.all([requestPromise]).then(function(results) {		
			return results[0];
	  });
	}
	
	let urls = [];

	$.each(options.labels ,function(i, val){
		let urlItem;
		
		if(options.mainLabel !== '')
			if(options.mainLabel !== val)
                urlItem = '/feeds/posts/default/-/' + options.mainLabel + '/' + val;
            else
                urlItem = '/feeds/posts/default/-/' + options.mainLabel;
		else
			urlItem = '/feeds/posts/default/-/' + val;
		
		urls.push(urlItem); 
	});			
	
	function analysisData(entry){
		let result = {};

        if($.inArray('url', options.fields) > -1 ){
            for(let j in entry.link){
                if(entry.link[j].rel == "alternate"){
                    result.url = entry.link[j].href;                                
                }
            }
        }
        if($.inArray('titlelink', options.fields) > -1 ){
            result.titlelink = '';
            for(let j in entry.link){
                if(entry.link[j].rel == "related"){
                    result.titlelink = entry.link[j].href;
                }
            }
        }
        
        if($.inArray('enclosure', options.fields) > -1 ){
            result.enclosure = [];
            for(let j in entry.link){
                if(entry.link[j].rel == "related"){
                    result.enclosure.push({
                        link: entry.link[j].href,
                        type: entry.link[j].type
                    });
                }
            }
        }
        if($.inArray('id', options.fields) > -1){
            result.id = entry.id.$t.split('post-')[1];
        }

        if($.inArray('title', options.fields) > -1){
            result.title = "title" in entry ? entry.title.$t : "";
        }

        if($.inArray('published', options.fields) > -1){            
            result.published = options.dateFormat === '' ? entry.published.$t : moment(entry.published.$t).format(options.dateFormat);
        }

        if($.inArray('updated', options.fields) > -1){
            result.updated = options.dateFormat === '' ? entry.updated.$t : moment(entry.updated.$t).format(options.dateFormat);
        }
        if($.inArray('label', options.fields) > -1){
            let category = "category" in entry ? entry.category : '';
            let cat = [];
            if(category !== ''){
                for(let n in category){
                    cat.push(category[n].term);
                }

                result.labels = cat;
            }
        }

        let content = "content" in entry ? entry.content.$t : '';
        let thumbnail = '';
        if($.inArray('thumbnail', options.fields) > -1){
            if("media$thumbnail" in entry){
                thumbnail = resizeImg(entry.media$thumbnail.url, options.thumbSize);

                thumbnail = options.thumbFix ? imageHostFix(thumbnail) : thumbnail;
            }else{
                if(content.indexOf('<img') != -1){
                    let rex = /<img.*?src="([^">]*\/([^">]*?))".*?>/g;
                    thumbnail = resizeImg(rex.exec(content)[1], options.thumbSize);

                    thumbnail = options.thumbFix ? imageHostFix(thumbnail) : thumbnail;
                }else{
                    thumbnail = DEFAULT_THUMB;
                }
            }

            result.thumbnail = thumbnail;
        }

        if($.inArray('snippet', options.fields) > -1){
            let sum = content.replace(/(<([^>]+)>)/ig,"").trim().replace(/ +(?= )/g,'');
            if(options.snippetlength == 'full')
                result.snippet = sum;
            else    
                result.snippet = sum.length <= options.snippetlength ? sum : sum.substr(0, options.snippetlength);
        }

        if($.inArray('location', options.fields) > -1){
            result.location = "georss$featurename" in entry ? entry.georss$featurename.$t : "";
        }
		
		return result;
	}
	
	function getAll(){
		let allRelatedPost = [],
            idExist = [];
		return urls.map(getJSON).reduce(function(sequence, chapterPromise) {		  
			return sequence.then(function() {			
				return chapterPromise;
			}).then(function(entry) {
				if(entry !== undefined){
					let count = 1;
					for(let i = 0, len = entry.length; i < entry.length; i++) {
						if(allRelatedPost.length == options.max) return allRelatedPost;
                        if(count == options.maxInLabel) break;
                        
						let id = entry[i].id.$t.split('post-')[1];                        
						if((allRelatedPost.length > 0 && $.inArray(id, idExist) > -1) || id == options.idPost)
                            continue;
						
                        idExist.push(id);
						allRelatedPost.push(analysisData(entry[i]));
						count++;						
					}
					
					return allRelatedPost;
				}					
			});
		}, Promise.resolve());
	}
	
	getAll().then(function(result) {		
        if(options.render){        
            let rendered = 'No Result';
            if(result.length > 0){
                let items = {"items" : result};

                let template = $(options.renderTemplate.template).html();
                Mustache.parse(template);
                rendered = Mustache.render(template, items);
            }
            $(options.renderTemplate.el).html(rendered);
            if(isFunction(callback))
                callback();
        }else{
            callback(result);
        }
	}).catch(function(err) {
		console.log("Opps, broken: " + err);
        callback('err');
	});
}

function pagination(options){
    let defaults = {
        blogId: '',
        el: '#pager',
        perPage:9,
        numPages:5,
        firstText:'First',
        lastText:'Last',
        nextText:"Next",
        prevText:"Prev",
        pageClass: "sgm-page-item",
        currentClass: "sgm-current",
        pageTextClass: "sgm-page-text",
        firstClass: 'sgm-page-first',
        lastClass: 'sgm-page-last',
        nextClass: 'sgm-page-next',
        prevClass: 'sgm-page-prev',
        showdot: true,
        showText: true,
        showNext: true,
        showPrev: true,
        showLast: true,
        showFirst: true
    };
    
    options = $.extend({}, defaults, options);    
    
    function _checkPageType(){
        let currentUrl = document.location.href,
            pageType = {};
        
        pageType.type = 'home';
        
        if(currentUrl.indexOf('/search/label/') != -1){            
            let label = currentUrl.split('/label/')[1];
            
            if(label.indexOf('?') > -1) label = label.split('?')[0];
            
            if(label !== ''){
                pageType.type = 'label';
                pageType.label = label;
            }            
        }else if(currentUrl.indexOf('/search?') != -1 && currentUrl.indexOf('q=') != -1){
            let query = currentUrl.split('q=')[1];
            
            if(query.indexOf('&') > -1) query = query.split('&')[0];
            
            if(query !== ''){
                pageType.type = 'search';
                pageType.q = query;
            }else{
                pageType.type = 'notfound';
            }
        }
        
        return pageType;
    }
    
    function _getTotal(){
        let pageType = _checkPageType();
        
        let url = 'http://sexygirlmedia.blogspot.com/feeds/posts/summary',
            ajaxData = {
                "max-results": 0,
                alt: "json-in-script"
            };
        
        if(pageType.type == 'label')
            url += '/-/' + pageType.label;
        
        if(pageType.type == 'search'){
            ajaxData.q = pageType.q;
            ajaxData['max-results'] = 5;
        }
            
        
        let requestPromise = new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                data: ajaxData,
                dataType: "jsonp",
                success: function(data) {
                    resolve({
                        total: data.feed.openSearch$totalResults.$t,
                        id: data.feed.id.$t.split('blog-')[1]
                    });
                },
                error: function(e){
                    reject(e);
                }
            });
        });

        return Promise.all([requestPromise]).then(function(results) {		
            return results[0];
        });
    }
    
    let allPost = [];
    function _getJSON(opts) {
        let url = 'https://www.googleapis.com/blogger/v3/blogs/'+ opts.blogId +'/posts';
        
        let dataSend = {
            key: GG_API_KEY,
            fields : 'nextPageToken,items(published)',
            maxResults: 500,
            prettyPrint: false
        };
        
        if('labels' in opts){
            dataSend.labels = opts.labels;
        }
        
        if('q' in opts){
            dataSend.q = opts.q;
            url += '/search';
        }
                
		var requestPromise = new Promise(function(resolve, reject) {
			(function _init(){
                $.ajax({
                    url: url,
                    data: dataSend,
                    dataType: "jsonp",
                    success: function(res) {
                        if('items' in res){
                            $.merge(allPost, res.items);

                            if('nextPageToken' in res){
                                dataSend.pageToken = res.nextPageToken;
                                _init();
                            }else{
                                resolve(allPost);
                            }
                        }else{
                            if('error' in res && res.error.code == 500)
                                _init();
                        }
                    },
                    error: function(e){
                        reject(e);
                    }
                });
            })();
		});

        return Promise.all([requestPromise]).then(function(results) {
          return results[0];
        });
	}
    
    function _show(data){
        let leftNum = Math.floor((options.numPages -1) / 2),
            rightNum = options.numPages - leftNum - 1,
            startPage = data.current - leftNum,
            endPage = data.current + rightNum;            
        
        if(startPage <= 0) startPage = 1;
        
        if ((endPage - startPage) < options.numPages) {
			endPage = startPage + options.numPages - 1;
		}
        
		if (endPage > data.total) {
			endPage = data.total;
			startPage = data.total - options.numPages + 1;
		}
        
		if(startPage <= 0) startPage = 1;
		
		let htmlPager = '';
		if (startPage > 1 && options.showFirst) {
			htmlPager += '<a class="sgm-pager '+ options.firstClass +'" href="' + data.first + '">' + options.firstText + "</a>";
		}
		if (data.current > 1 & options.showPrev) {			
			htmlPager += '<a class="sgm-pager '+ options.prevClass +'" href="' + data.items[data.current - 1 - 1] + '">' + options.prevText + "</a>";
		}
        
		for (let i = startPage; i <= endPage; i++) {
			if (i == data.current) {
				htmlPager += '<span class="sgm-pager '+ options.currentClass +'">' + i + "</span>";
			} else {
				htmlPager += '<a class="sgm-pager '+ options.pageClass +'" href="' + data.items[i-1] + '">' + i + "</a>";
			}
		}
		        
        if(options.showdot && endPage < data.total)
            htmlPager += ' ... ' + '<a class="sgm-pager '+ options.pageClass +'" href="' + data.last + '">' + data.total + "</a>";
        
		if (data.current < data.total && options.showNext) {
			htmlPager += '<a class="sgm-pager '+ options.nextClass +'" href="' + data.items[data.current] + '">' + options.nextText + "</a>";
		}
		
		if (endPage < data.total && options.showLast) {
			htmlPager += '<a class="sgm-pager '+ options.lastClass +'" href="' + data.last + '">' + options.lastText + "</a>";
		}
		
        if(options.showText)
            htmlPager = '<span class="sgm-pager '+ options.pageTextClass +'">Pages ' + data.current + ' of ' + data.total + '</span>' + htmlPager;
        
		$(options.el).html(htmlPager);
    }
    
    function init(){
        let pageType = _checkPageType();
        
        if(pageType.type != 'notfound'){
            _getTotal().then(function(data){
                if(data.total > options.perPage){
                    $(options.el).html('Loading...');

                    let ops = {
                        blogId: data.id
                    };

                    if(pageType.type == 'label'){
                        ops.labels = pageType.label;
                    }
                    
                    if(pageType.type == 'search'){
                        ops.q = pageType.q;
                    }
                    
                    _getJSON(ops).then(function(result){                    
                        let totalPage = Math.ceil(result.length / options.perPage);
                        let urls = {};

                        urls.current = 1;
                        urls.total = totalPage;

                        let indexLast = (totalPage - 1) * options.perPage;
                        let timeLast = result[indexLast].published;
                        let urlItem = '';

                        if(pageType.type == 'label'){
                            urls.first = "/search/label/" + pageType.label + "?max-results=" + options.perPage;

                            urls.last = "/search/label/" + pageType.label + "?updated-max=" + encodeURIComponent(timeLast) + "&max-results=" + options.perPage;

                            urlItem = "/search/label/" + pageType.label + "?max-results=" + options.perPage + "&updated-max=";
                        }else if(pageType.type == 'home'){
                            urls.first = "/?max-results=" + options.perPage;                    

                            urls.last = "/search?updated-max=" + encodeURIComponent(timeLast) + "&max-results=" + options.perPage;

                            urlItem = "/search?max-results=" + options.perPage + "&updated-max=";
                        }else if(pageType.type == 'search'){
                            urls.first = "/search?max-results=" + options.perPage + '&q=' + pageType.q;

                            urls.last = "/search?updated-max=" + encodeURIComponent(timeLast) + "&max-results=" + options.perPage + '&q=' + pageType.q;

                            urlItem = "/search?q="+ pageType.q +"&max-results=" + options.perPage + "&updated-max=";
                        }

                        urls.items = [];
                        //let currentUrl = document.location.href;
                        let currentUrl = 'http://127.0.0.1:49853/search?max-results=50&updated-max=2016-01-09T21%3A58%3A00%2B07%3A00';

                        for(let i = 0; i < totalPage; i++){
                            if(i === 0){
                                urls.items.push(urls.first);
                            }else{
                                let indexPage = i * options.perPage;
                                if(decodeURIComponent(currentUrl).indexOf(result[indexPage].published) != -1)
                                    urls.current = i + 1;

                                urls.items.push(urlItem + encodeURIComponent(result[indexPage].published) + (pageType.type=='search' ? ('&start=' + indexPage) : ""));
                            }
                        }

                        _show(urls);
                    }).catch(function(e){
                        console.log(e);
                    });
                }        
            }).catch(function(e){
                console.log(e);
            });
        }
    }    
    
    init();
}

function getPostByPath(options, callback){
    if(typeof options.blogId === "undefined" || options.blogId === '' || options.blogId === null || typeof options.dataSend.path === "undefined" || options.dataSend.path === '' || options.dataSend.path === null)
		return;
    
    let defaults = {        
        blogId: '',
        snippetlength : 150, //full or number
        thumbSize: {'s':'0',"crop":"no"},
        thumbFix : true,
        fields : ["id","title","url","thumbnail","snippet","published","updated","label","location"],
        dataSend : {
            path: '',
            "fetchImages": false,
            "fetchBodies": false,            
            //fields : '(id,title,url)'
        },
        beforeHandle: function(){},
        render: false,
        renderTemplate:{
            el: '#sgm-render',
            template: '#mustache-template',
            errorText: 'Error!! Try Refresh page!'
        },
        dateFormat: ''
    };
    
    options = $.extend({}, defaults, options);
    
    if(options.fields.length > 0){
        let fieldGet = '';
        if($.inArray('id', options.fields) > -1){
           fieldGet += fieldGet === '' ? 'id' : ',id';
        }
        if($.inArray('title', options.fields) > -1){
           fieldGet += fieldGet === '' ? 'title' : ',title';
        }
        if($.inArray('url', options.fields) > -1){
           fieldGet += fieldGet === '' ? 'url' : ',url';
        }
        if($.inArray('published', options.fields) > -1){
           fieldGet += fieldGet === '' ? 'published' : ',published';
        }
        if($.inArray('updated', options.fields) > -1){
           fieldGet += fieldGet === '' ? 'updated' : ',updated';
        }
        if($.inArray('label', options.fields) > -1){
           fieldGet += fieldGet === '' ? 'labels' : ',labels';
        }
        if($.inArray('location', options.fields) > -1){
           fieldGet += fieldGet === '' ? 'location(name)' : ',location(name)';
        }
        
        if($.inArray('thumbnail', options.fields) > -1 || $.inArray('snippet', options.fields) > -1){
            options.dataSend.fetchBodies = true;
            options.dataSend.fetchImages = true;
            fieldGet += fieldGet === '' ? 'images,content' : ',images,content';    
        }
        
        options.dataSend.fields =  fieldGet;
    }
    
    if(options.fields.length === 0){
        options.dataSend.fetchBodies = true;
        options.dataSend.fetchImages = true;
    }
    
    getAjax({
        url: 'https://www.googleapis.com/blogger/v3/blogs/'+ options.blogId +'/posts/bypath',
        dataSend: options.dataSend,
        beforeHandle: options.beforeHandle
    }, function(data){
        if(data != 'err'){
            if(!('error' in data)){                
                let entryObj = analyzePostApi(data, options);
                
                if(options.render){
                    let template = $(options.renderTemplate.template).html();
                    
                    Mustache.parse(template);
                    let rendered = Mustache.render(template, entryObj);
                    $(options.renderTemplate.el).html(rendered);
                    if(isFunction(callback))
                        callback();
                }else{
                    callback(entryObj);
                }
            }else{
                callback('err');
            }
        }else{
            if(options.render){
                $(options.renderTemplate.el).html(options.renderTemplate.errorText);
            }else{
                callback(data);   
            }
        }
    });
}

function analyzePage(entry, options){
    let result = {};

    if(entry !== undefined){
        if($.inArray('url', options.fields) > -1 ){
            for(let j in entry.link){
                if(entry.link[j].rel == "alternate"){
                    result.url = entry.link[j].href;
                }
            }
        }
        if($.inArray('id', options.fields) > -1){
            result.id = entry.id.$t.split('page-')[1];
        }

        if($.inArray('title', options.fields) > -1){
            result.title = "title" in entry ? entry.title.$t : "";
        }

        if($.inArray('published', options.fields) > -1){
            result.published = options.dateFormat === '' ? entry.published.$t : moment(entry.published.$t).format(options.dateFormat);
        }

        if($.inArray('updated', options.fields) > -1){
            result.updated = options.dateFormat === '' ? entry.updated.$t : moment(entry.updated.$t).format(options.dateFormat);
        }

        if("content" in entry){
            let content = "content" in entry ? entry.content.$t : '';

            if($.inArray('content', options.fields) > -1){
                result.content = content;
            }

            let thumbnail = '';
            if($.inArray('thumbnail', options.fields) > -1){
                if("media$thumbnail" in entry){
                    thumbnail = resizeImg(entry.media$thumbnail.url, options.thumbSize);

                    thumbnail = options.thumbFix ? imageHostFix(thumbnail) : thumbnail;
                }else{
                    let rex = /<img.*?src="([^">]*\/([^">]*?))".*?>/g;
                    if(content.indexOf('<img') != -1 && rex.test(content)){
                        thumbnail = resizeImg(rex.exec(content)[1], options.thumbSize);
                        thumbnail = options.thumbFix ? imageHostFix(thumbnail) : thumbnail;   
                    }else{
                        thumbnail = DEFAULT_THUMB;
                    }
                }

                result.thumbnail = thumbnail;
            }  
        }

        if($.inArray('snippet', options.fields) > -1){
            let content = "content" in entry ? entry.content.$t : ("summary" in entry ? entry.summary : "");
            
            let sum = content.replace(/(<([^>]+)>)/ig,"").trim().replace(/ +(?= )/g,'');
            if(options.snippetlength == 'full')
                result.snippet = sum;
            else    
                result.snippet = sum.length <= options.snippetlength ? sum : sum.substr(0, options.snippetlength);
        }         
    }
    
    return result;
}

function getPage(options, callback){
    let defaults = {
        id: '',
        blogUrl: '',
        snippetlength : 150, //full or number
        thumbSize: {'s':'0',"crop":"no"},
        thumbFix : true,
        fields : ["id","title","url","thumbnail","snippet","content","published","updated"],
        beforeHandle: function(){},
        render: false,
        renderTemplate:{
            el: '#sgm-render',
            template: '#mustache-template',
            errorText: 'Error!! Try Refresh page!'
        },
        dateFormat: ''
    };
    
    options = $.extend({}, defaults, options);
    
    let urlPath = '/feeds/pages/summary/';
    
    if($.inArray('thumbnail', options.fields) > -1 || $.inArray('content', options.fields) > -1){
        urlPath = '/feeds/pages/default/';
    }
        
    getAjax({
        url: options.blogUrl === '' ? urlPath + options.id : options.blogUrl + urlPath + options.id,
        beforeHandle: options.beforeHandle
    }, function(data){
        if(data !== 'err'){
            let entryObj = analyzePage(data.entry, options);
                
            if(options.render){
                let template = $(options.renderTemplate.template).html();

                Mustache.parse(template);
                let rendered = Mustache.render(template, entryObj);
                $(options.renderTemplate.el).html(rendered);
                
                if(isFunction(callback))
                    callback();
            }else{
                callback(entryObj);
            }            
        }else{
            callback(data);
        }
    });
}

function getListPage(options, callback){	
    let defaults = {
        blogUrl: '',        
        beforeHandle: function(){},
        dataSend : {
            "max-results" : 150,
            "orderby" : "published",
            "start-index": 1
        },
        fields : ["id","title","url","thumbnail","snippet","content","published","updated"],
        snippetlength : 150, //full or number
        thumbSize: {'s':'0',"crop":"no"},
        thumbFix : true,
        render: false,
        renderTemplate:{
            el: '#sgm-render',
            template: '#mustache-template',
            errorText: 'Error!! Try Refresh page!'
        },
        dateFormat: ''
    };
	
    options = $.extend({}, defaults, options);
    
    let urlPath = '/feeds/pages/summary';
    
    if($.inArray('thumbnail', options.fields) > -1 || $.inArray('content', options.fields) > -1){
        urlPath = '/feeds/pages/default';
    }
    
    getAjax({
        url: options.blogUrl === '' ? urlPath : options.blogUrl + urlPath,
        dataSend: options.dataSend,
        beforeHandle: options.beforeHandle
    }, function(data){
        if(data != 'err'){
            let entry = data.feed.entry,
                result = [];
            
            if(entry !== undefined){
                for(let i = 0, len = entry.length; i < len; i++){
                    result.push(analyzePage(entry[i], options));
                }
            }
            
            if(options.render){
                let rendered = 'No Result';
                if(result.length > 0){
                    let items = {"items" : result};

                    let template = $(options.renderTemplate.template).html();
                    Mustache.parse(template);
                    rendered = Mustache.render(template, items);
                }

                $(options.renderTemplate.el).html(rendered);
                
                if(isFunction(callback))
                    callback();
            }else{
                callback(result);
            }                        
        }else{
            callback(data);
        }
    });
}

function analyzeComment(entry, options){
    let result = {};

    if(entry !== undefined){
        if($.inArray('url', options.fields) > -1 ){
            for(let j in entry.link){
                if(entry.link[j].rel == "alternate"){
                    result.url = entry.link[j].href;
                }
            }
        }
        if($.inArray('id', options.fields) > -1){
            result.id = entry.id.$t.split('post-')[1];
        }

        if($.inArray('title', options.fields) > -1){
            result.title = "title" in entry ? entry.title.$t : "";
        }

        if($.inArray('published', options.fields) > -1){
            result.published = options.dateFormat === '' ? entry.published.$t : moment(entry.published.$t).format(options.dateFormat);
        }

        if($.inArray('updated', options.fields) > -1){
            result.updated = options.dateFormat === '' ? entry.updated.$t : moment(entry.updated.$t).format(options.dateFormat);
        }
        
        if($.inArray('content', options.fields) > -1 && "content" in entry){
            result.content = "content" in entry ? entry.content.$t : '';
        }         

        if($.inArray('snippet', options.fields) > -1){
            let content = "content" in entry ? entry.content.$t : ("summary" in entry ? entry.summary : "");
            
            let sum = content.replace(/(<([^>]+)>)/ig,"").trim().replace(/ +(?= )/g,'');
            if(options.snippetlength == 'full')
                result.snippet = sum;
            else    
                result.snippet = sum.length <= options.snippetlength ? sum : sum.substr(0, options.snippetlength);
        }
        
        if($.inArray('author', options.fields) > -1){
            result.author = {
                name : entry.author[0].name.$t,
                link : entry.author[0].uri.$t,
                email : entry.author[0].email.$t == 'noreply@blogger.com' ? '' : entry.author[0].email.$t,
                avt : entry.author[0].gd$image.src
            };            
        }
    }
    
    return result;
}

function getListComment(options, callback){
    let defaults = {
        blogUrl: '',
        postId: '',
        beforeHandle: function(){},
        dataSend : {
            "max-results" : 500,
            "orderby" : "published",
            "start-index": 1
        },
        fields : ["id","title","url","snippet","content","published","updated","author"],
        snippetlength : 150, //full or number
        thumbSize: {'s':'0',"crop":"no"},
        thumbFix : true,
        render: false,
        renderTemplate:{
            el: '#sgm-render',
            template: '#mustache-template',
            errorText: 'Error!! Try Refresh page!'
        },
        dateFormat: ''
    };
	
    options = $.extend({}, defaults, options);
    
    let urlPath = '/feeds/' + options.postId + '/comments/summary';
    
    if($.inArray('content', options.fields) > -1){
        urlPath = '/feeds/' + options.postId + '/comments/default';
    }
    
    getAjax({
        url: options.blogUrl === '' ? urlPath : options.blogUrl + urlPath,
        dataSend: options.dataSend,
        beforeHandle: options.beforeHandle
    }, function(data){
        if(data != 'err'){
            let entry = data.feed.entry,
                result = {};
            
            result.title = data.feed.title.$t.substr(data.feed.title.$t.indexOf(':')).trim();
            
            for(let j in data.feed.link){
                if(data.feed.link[j].rel == "alternate"){
                    result.url = data.feed.link[j].href;
                }
            }
            
            result.total = data.feed.openSearch$totalResults.$t;
            
            result.comments = [];
            if(entry !== undefined){
                for(let i = 0, len = entry.length; i < len; i++){
                    result.comments.push(analyzeComment(entry[i], options));
                }
            }                        
            
            if(options.render){                
                let template = $(options.renderTemplate.template).html();
                Mustache.parse(template);
                let rendered = Mustache.render(template, result);
                $(options.renderTemplate.el).html(rendered);
                
                if(isFunction(callback))
                    callback();
            }else{
                callback(result);
            }
        }else{
            callback(data);
        }
    });
}

function getNewComment(options, callback){
    let defaults = {
        blogUrl: '',        
        beforeHandle: function(){},
        dataSend : {
            "max-results" : 500,
            "orderby" : "published",
            "start-index": 1
        },
        fields : ["id","title","url","snippet","content","published","updated","author"],
        snippetlength : 150, //full or number
        thumbSize: {'s':'0',"crop":"no"},
        thumbFix : true,
        render: false,
        renderTemplate:{
            el: '#sgm-render',
            template: '#mustache-template',
            errorText: 'Error!! Try Refresh page!'
        },
        dateFormat: ''
    };
    
    options = $.extend({}, defaults, options);
    
    let urlPath = '/feeds/comments/summary';
    
    if($.inArray('content', options.fields) > -1){
        urlPath = '/feeds/comments/default';
    }
    
    getAjax({
        url: options.blogUrl === '' ? urlPath : options.blogUrl + urlPath,
        dataSend: options.dataSend,
        beforeHandle: options.beforeHandle
    }, function(data){
        if(data != 'err'){
            let entry = data.feed.entry,
                result = [];            
                        
            if(entry !== undefined){
                for(let i = 0, len = entry.length; i < len; i++){
                    result.push(analyzeComment(entry[i], options));
                }
            }
            
            if(options.render){
                let rendered = 'No Result';
                if(result.length > 0){
                    let items = {"items" : result};

                    let template = $(options.renderTemplate.template).html();
                    Mustache.parse(template);
                    rendered = Mustache.render(template, items);
                }

                $(options.renderTemplate.el).html(rendered);
                
                if(isFunction(callback))
                    callback();
            }else{
                callback(result);
            }
        }else{
            callback(data);
        }
    });
}

function paginationFeed(options){
    let defaults = {
        perPage : 3,
        numPages : 3,
        firstText : 'First',
        lastText : 'Last',
        prevText : '« Previous',
        nextText : 'Next »',
        urlactivepage : location.href,
        home_page : "/"
    };

    options = $.extend({}, defaults, options);
        
    var noPage;
    var currentPage;
    var currentPageNo;
    var postLabel;
    pagecurrentg();

    function looppagecurrentg(pageInfo) {
        var html = '';
        let pageNumber = parseInt(options.numPages / 2);
        
        if (pageNumber == options.numPages - pageNumber) {
            options.numPages = pageNumber * 2 + 1;
        }
        
        let pageStart = currentPageNo - pageNumber;
        
        if (pageStart < 1) pageStart = 1;
        let lastPageNo = parseInt(pageInfo / options.perPage) + 1;
        
        if (lastPageNo - 1 == pageInfo / options.perPage) lastPageNo = lastPageNo - 1;
        let pageEnd = pageStart + options.numPages - 1;
        
        if (pageEnd > lastPageNo) pageEnd = lastPageNo;
        html += "<span class='showpageOf'>Page " + currentPageNo + ' of ' + lastPageNo + "</span>";
        
        var prevNumber = parseInt(currentPageNo) - 1;
        
        if (currentPageNo > 1) {
            if (currentPage == "page") {
                html += '<span class="showpage firstpage"><a href="' +  options.home_page + '">' +  options.firstText + '</a></span>';
            } else {
                html += '<span class="displaypageNum firstpage"><a href="/search/label/' + postLabel + '?&max-results=' +  options.perPage + '">' +  options.firstText + '</a></span>';
            }
        }
        
        if (currentPageNo > 2) {
            if (currentPageNo == 3) {
                if (currentPage == "page") {
                    html += '<span class="showpage"><a href="' +  options.home_page + '">' + options.prevText + '</a></span>';
                } else {
                    html += '<span class="displaypageNum"><a href="/search/label/' + postLabel + '?&max-results=' +  options.perPage + '">' +  options.prevText + '</a></span>';
                }
            } else {
                if (currentPage == "page") {
                    html += '<span class="displaypageNum"><a href="#" onclick="redirectpage(' + prevNumber + ');return false">' +  options.prevText + '</a></span>';
                } else {
                    html += '<span class="displaypageNum"><a href="#" onclick="redirectlabel(' + prevNumber + ');return false">' +  options.prevText + '</a></span>';
                }
            }
        }
        
        if (pageStart > 1) {
            if (currentPage == "page") {
                html += '<span class="displaypageNum"><a href="' +  options.home_page + '">1</a></span>';
            } else {
                html += '<span class="displaypageNum"><a href="/search/label/' + postLabel + '?&max-results=' +  options.perPage + '">1</a></span>';
            }
        }
        
        if (pageStart > 2) {
            html += ' ... ';
        }
        
        for (var jj = pageStart; jj <= pageEnd; jj++) {
            if (currentPageNo == jj) {
                html += '<span class="pagecurrent">' + jj + '</span>';
            } else if (jj == 1) {
                if (currentPage == "page") {
                    html += '<span class="displaypageNum"><a href="' + options.home_page + '">1</a></span>';
                } else {
                    html += '<span class="displaypageNum"><a href="/search/label/' + postLabel + '?&max-results=' + options.perPage + '">1</a></span>';
                }
            } else {
                if (currentPage == "page") {
                    html += '<span class="displaypageNum"><a href="#" onclick="redirectpage(' + jj + ');return false">' + jj + '</a></span>';
                } else {
                    html += '<span class="displaypageNum"><a href="#" onclick="redirectlabel(' + jj + ');return false">' + jj + '</a></span>';
                }
            }
        }
        
        if (pageEnd < lastPageNo - 1) {
            html += '...';
        }
        
        if (pageEnd < lastPageNo) {
            if (currentPage == "page") {
                html += '<span class="displaypageNum"><a href="#" onclick="redirectpage(' + lastPageNo + ');return false">' + lastPageNo + '</a></span>';
            } else {
                html += '<span class="displaypageNum"><a href="#" onclick="redirectlabel(' + lastPageNo + ');return false">' + lastPageNo + '</a></span>';
            }
        }
        
        var nextnumber = parseInt(currentPageNo) + 1;
        
        if (currentPageNo < (lastPageNo - 1)) {
            if (currentPage == "page") {
                html += '<span class="displaypageNum"><a href="#" onclick="redirectpage(' + nextnumber + ');return false">' +  options.nextText + '</a></span>';
            } else {
                html += '<span class="displaypageNum"><a href="#" onclick="redirectlabel(' + nextnumber + ');return false">' +  options.nextText + '</a></span>';
            }
        }
        
        if (currentPageNo < lastPageNo) {
            if (currentPage == "page") {
                html += '<span class="displaypageNum lastpage"><a href="#" onclick="redirectpage(' + lastPageNo + ');return false">' +  options.lastText + '</a></span>';
            } else {
                html += '<span class="displaypageNum lastpage"><a href="#" onclick="redirectlabel(' + lastPageNo + ');return false">' +  options.lastText + '</a></span>';
            }
        }
        
        var pageArea = document.getElementsByName("pageArea");
        var blogPager = document.getElementById("blog-pager");
        
        for (var p = 0; p < pageArea.length; p++) {
            pageArea[p].innerHTML = html;
        }
        
        if (pageArea && pageArea.length > 0) {
            html = '';
        }
        
        if (blogPager) {
            blogPager.innerHTML = html;
        }
    }

    function totalcountdata(root) {
        var feed = root.feed;
        var totaldata = parseInt(feed.openSearch$totalResults.$t, 10);
        looppagecurrentg(totaldata);
    }

    function pagecurrentg() {
        var thisUrl = options.urlactivepage;
        if (thisUrl.indexOf("/search/label/") != -1) {
            if (thisUrl.indexOf("?updated-max") != -1) {
                postLabel = thisUrl.substring(thisUrl.indexOf("/search/label/") + 14, thisUrl.indexOf("?updated-max"));
            } else {
                postLabel = thisUrl.substring(thisUrl.indexOf("/search/label/") + 14, thisUrl.indexOf("?&max"));
            }
        }
        if (thisUrl.indexOf("?q=") == -1 && thisUrl.indexOf(".html") == -1) {
            if (thisUrl.indexOf("/search/label/") == -1) {
                currentPage = "page";
                
                if (options.urlactivepage.indexOf("#PageNo=") != -1) {
                    currentPageNo = options.urlactivepage.substring(options.urlactivepage.indexOf("#PageNo=") + 8, options.urlactivepage.length);
                } else {
                    currentPageNo = 1;
                }
                
                document.write("<script src=\"" + options.home_page + "feeds/posts/summary?max-results=1&alt=json-in-script&callback=totalcountdata\"><\/script>");
            } else {
                currentPage = "label";
                if (thisUrl.indexOf("&max-results=") == -1) {
                     options.perPage = 20;
                }
                
                if (options.urlactivepage.indexOf("#PageNo=") != -1) {
                    currentPageNo = options.urlactivepage.substring(options.urlactivepage.indexOf("#PageNo=") + 8, options.urlactivepage.length);
                } else {
                    currentPageNo = 1;
                }
                
                document.write('<script src="' + options.home_page + 'feeds/posts/summary/-/' + postLabel + '?alt=json-in-script&callback=totalcountdata&max-results=1" ><\/script>');
            }
        }
    }

    function redirectpage(numberpage) {
        let jsonstart = (numberpage - 1) *  options.perPage;
        noPage = numberpage;
        
        var nameBody = document.getElementsByTagName('head')[0];
        var newInclude = document.createElement('script');
        newInclude.type = 'text/javascript';
        newInclude.setAttribute("src",  options.home_page + "feeds/posts/summary?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
        nameBody.appendChild(newInclude);
    }

    function redirectlabel(numberpage) {
        let jsonstart = (numberpage - 1) *  options.perPage;
        noPage = numberpage;
        
        var nameBody = document.getElementsByTagName('head')[0];
        var newInclude = document.createElement('script');
        newInclude.type = 'text/javascript';
        newInclude.setAttribute("src",  options.home_page + "feeds/posts/summary/-/" + postLabel + "?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
        nameBody.appendChild(newInclude);
    }

    function finddatepost(root) {
        let post = root.feed.entry[0];
        var timestamp1 = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29);
        var timestamp = encodeURIComponent(timestamp1);
        
        let pAddress = "/search/label/" + postLabel + "?updated-max=" + timestamp + "&max-results=" +  options.perPage + "#PageNo=" + noPage;
        if (currentPage == "page") {
            pAddress = "/search?updated-max=" + timestamp + "&max-results=" +  options.perPage + "#PageNo=" + noPage;
        }
        
        location.href = pAddress;
    }
}

function getPostByTag(options, callback){
    
}

function searchAjax(options, callback){
    if(options.q === '' || options.q === null || options.q === undefined)
        return;
    
    let defaults = {
        blogUrl: '',
        labels: '',
        q: '',
		max : 10,
        beforeHandle: function(){},
        dataSend : {
            "alt":"json-in-script",
            "max-results" : 150,
            "orderby" : "published",
            "start-index": 1
        },
        snippetlength : 150, //full or number
        thumbSize: {'s':'0',"crop":"no"},
        thumbFix : true,
        fields : ["id","title","url","thumbnail","snippet","published","updated","label","location","titlelink","enclosure"],
        render: false,
        renderTemplate:{
            el: '#sgm-render',
            template: '#mustache-template',
            errorText: 'Error!! Try Refresh page!'
        },
        dateFormat: ''
    };
    
    options = $.extend({}, defaults, options);
    
    let urlPath = '/feeds/posts/summary/';
    
    if($.inArray('thumbnail', options.fields) > -1 || $.inArray('content', options.fields) > -1){
        urlPath = '/feeds/posts/default/';
    }
    
    let initOption = {
        url: options.blogUrl === '' ? urlPath : options.blogUrl + urlPath,
        beforeHandle: options.beforeHandle,
        dataSend : options.dataSend
    };
    
    let result = [];
    (function _init(){
        getAjax(initOption, function(data){
            if(data != 'err'){
                let entry = data.feed.entry;
                
                let total = toInt(data.feed.openSearch$totalResults.$t);
                
                for(let i = 0, len = entry.length; i < len; i++){
                    if(result.length >= options.max) break;
                    
                    if(entry[i].title.$t.indexOf(options.q) != -1){
                        result.push(analyzePost(entry[i], options));
                    }
                }

                if(result.length < options.max && initOption.dataSend["max-results"] <= total){
                    if(initOption.dataSend["start-index"] == 1)
                        initOption.dataSend["start-index"] += initOption.dataSend["max-results"];
                    else
                        initOption.dataSend["start-index"] += initOption.dataSend["max-results"] + 1;
                    _init();
                }else{
                    if(options.render){
                        let rendered = 'No Result';
                        if(result.length > 0){
                            let items = {"items" : result};

                            let template = $(options.renderTemplate.template).html();
                            Mustache.parse(template);
                            rendered = Mustache.render(template, items);
                        }

                        $(options.renderTemplate.el).html(rendered);
                        if(isFunction(callback))
                            callback();
                    }else{
                        callback(result);
                    }                    
                }
            }else{
                callback(data);
            }
        });
    })();
}

function filterPost(options, callback){
    
}
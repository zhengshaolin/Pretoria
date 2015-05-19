function Drag(e) {
    //$('#cnm').on('click',function(e){
    window.dragcache = window.dragcache || {}
    Drag.prototype.init.prototype = Drag.prototype;
    return new Drag.prototype.init(e) //})
}
Drag.prototype.init = function(e) {
    var btn;
    if (e.target != $('.selector')[0] && e.target != $('#cnm')[0] && e.target != $('.x_rb')[0] && e.target != $('.x_rt')[0] && e.target != $('.x_lt')[0] && e.target != $('.x_lb')[0]) {
        this.clean();
        this[0] = (function(e) {
            dragcache = e.target;
            return e.target;
        })(e);
        btn = this.render();
        this.dragger(btn)
    } else if(e.target == $('#cnm')[0]){
        this[0] = $('#cnm')[0];
        $('.selector').hide()
    }else{
        this[0] = dragcache
    }
}
Drag.prototype.render = function() {
    var html = $('.selector'),
        that = this[0],
        border = parseInt($('#cnm').css('border')),
        width = that.offsetWidth,
        height = that.offsetHeight,
        top = $(that).offset().top - $('#cnm').offset().top - border,
        left = $(that).offset().left - $('#cnm').offset().left - border;
    html.css({
        border: '2px dashed #000',
        width: width,
        height: height,
        position: 'absolute',
        left: left,
        top: top
    });
    var stack1 = $('<div style="position:absolute;top:-4px;left:-4px;width:8px;height:8px;background:black" class="x_lt"></div>'),
        stack2 = $('<div style="position:absolute;top:-4px;right:-4px;width:8px;height:8px;background:black" class="x_rt"></div>'),
        stack3 = $('<div style="position:absolute;bottom:-4px;left:-4px;width:8px;height:8px;background:black" class="x_lb"></div>'),
        stack4 = $('<div style="position:absolute;bottom:-4px;right:-4px;width:8px;height:8px;background:black" class="x_rb"></div>');
    if (($('.x_lt').length + $('.x_rt').length + $('.x_lb').length + $('.x_rb').length) == 0) {
        html.append(stack1).append(stack2).append(stack3).append(stack4)
        html.show()
        this.dragDiv()
        return [stack1, stack2, stack3, stack4]
    } else {
        html.show()
        this.dragDiv()
        return [$('.x_lt'), $('.x_rt'), $('.x_lb'), $('.x_rb')]
    }
}
Drag.prototype.clean = function() {
    var html = $('.selector');
    html.css('top', '9999px').css('left', '9999px')
}
Drag.prototype.dragger = function(btn) {
    var that = this[0],
        thatall = this;
    $(btn).each(function() {
        $(this).on('mousedown', function(e) {
            e.stopPropagation();
            var _this = $(this)[0],
                page = {
                    event: function(evt) {
                        var ev = evt || window.event;
                        return ev;
                    },
                    pageX: function(evt) {
                        var e = this.event(evt);
                        return e.pageX //|| (e.clientX + document.body.scrollLeft - document.body.clientLeft);
                    },
                    pageY: function(evt) {
                        var e = this.event(evt);
                        return e.pageY //|| (e.clientY + document.body.scrollTop - document.body.clientTop);

                    },
                    layerX: function(evt) {
                        var e = this.event(evt);
                        return e.layerX || e.offsetX;
                    },
                    layerY: function(evt) {
                        var e = this.event(evt);
                        return e.layerY || e.offsetY;
                    }
                },
                x = page.layerX(e),
                y = page.layerY(e),
                html = $('.selector'),
                beginx = $(this).offset().left - html.offset().left,
                beginwidth = parseInt(html.css('width')),
                beginheight = parseInt(html.css('height')),
                htmlleft = parseInt(html.css('left')),
                htmltop = parseInt(html.css('top')),
                beginy = $(this).offset().top - html.offset().top;
            if (_this.setCapture) {
                _this.setCapture();
            } else if (window.captureEvents) {
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }
            document.onmousemove = function(e) {

                var tx = page.pageX(e) - x - htmlleft - $('#cnm').offset().left - parseInt(html.css('border')),
                    ty = page.pageY(e) - y - htmltop - $('#cnm').offset().top - parseInt(html.css('border'));
                if ($(_this).hasClass('x_rb')) {
                    html.css('width', tx - beginx + beginwidth + 2).css('height', ty - beginy + beginheight + 2)
                } else if ($(_this).hasClass('x_lb')) {
                    html.css('width', -tx - beginx + beginwidth + 2).css('height', ty - beginy + beginheight + 2)
                    html.css('left', htmlleft + tx + parseInt($(_this).css('left')))
                } else if ($(_this).hasClass('x_lt')) {
                    html.css('width', -tx - beginx + beginwidth + 2).css('height', -ty - beginy + beginheight + 2)
                    html.css('left', htmlleft + tx + parseInt($(_this).css('left')))
                    html.css('top', htmltop + ty + parseInt($(_this).css('top')))
                } else if ($(_this).hasClass('x_rt')) {
                    html.css('width', tx - beginx + beginwidth + 2).css('height', -ty - beginy + beginheight + 2)
                    html.css('top', htmltop + ty + parseInt($(_this).css('top')))

                }
            }
            document.onmouseup = function() {
                if (_this.releaseCapture) {
                    _this.releaseCapture();
                } else if (window.releaseEvents) {
                    window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
                }
                document.onmousemove = null;
                document.onmouseup = null;
                thatall.selreset()
                //console.log($(that).attr('plane'), $(that).attr('vertical'))
                thatall.tagreset($(that).attr('plane'), $(that).attr('vertical'))
            }
        })
    })
}
Drag.prototype.selreset = function() {
    $(this[0]).css('width', $('.selector').width())
    $(this[0]).css('height', $('.selector').height());
    var top = $('.selector').css('top'),
        left = $('.selector').css('left');
    $(this[0]).css({
        top: top,
        left: left
    })
}
Drag.prototype.tagreset = function(x, y) {
    var that = $(this[0]);
    var sel = $('.selector');
    var targetWidth = that.width(),
        targetHeight = that.height(),
        targetTop = that.css('top'),
        targetLeft = that.css('left'),
        mainWidth = $('#cnm').width(),
        mainHeight = $('#cnm').height();

    function correct() {
        var targetLeft = that.css('left'),
            targetTop = that.css('top'),
            targetHeight = that.height(),
            targetWidth = that.width();
        if (Math.abs(parseInt(targetLeft)) + 1) {
            if (parseInt(targetLeft) < 0) {
                if (targetWidth >= mainWidth) {
                    that.css('width', mainWidth).css('left', 0)
                    sel.css('width', mainWidth).css('left', 0)
                } else {
                    that.css('width', targetWidth).css('left', 0)
                    sel.css('width', targetWidth).css('left', 0)
                }
            } else {
                if (targetWidth + parseInt(targetLeft) > mainWidth) {
                    if (targetWidth < mainWidth) {
                        that.css('width', targetWidth).css('left', mainWidth - targetWidth)
                        sel.css({
                            width: targetWidth
                        }).css('left', mainWidth - targetWidth)
                    } else {
                        that.css('width', mainWidth).css('left', 0)
                        sel.css('left', 0).css('width', mainWidth)
                    }
                }
            }
        } else {
            var targetRight = that.css('right');
            if (parseInt(targetRight) < 0) {
                if (targetWidth >= mainWidth) {
                    that.css('width', mainWidth).css('right', 0)
                    sel.css('left', 0).css('width', mainWidth)
                } else {
                    that.css('width', targetWidth).css('right', 0)
                    sel.css('left', mainWidth - targetWidth).css('width', targetWidth)
                }
            } else {
                if (targetWidth + parseInt(targetRight) > mainWidth) {
                    if (targetWidth > mainWidth) {
                        that.css('width', mainWidth).css('right', 0)
                        sel.css('left', 0).css('width', mainWidth)
                    } else {
                        that.css('width', targetWidth).css('right', mainWidth - targetWidth)
                        sel.css('left', 0).css('width', targetWidth)
                    }
                }
            }
        }
        if (Math.abs(parseInt(targetTop)) + 1) {
            if (parseInt(targetTop) < 0) {
                if (targetHeight >= mainHeight) {
                    that.css('height', mainHeight).css('top', 0)
                    sel.css('height', mainHeight).css('top', 0)
                } else {
                    that.css('height', targetHeight).css('top', 0)
                    sel.css('height', targetHeight).css('top', 0)
                }
            } else {
                if (targetHeight + parseInt(targetTop) > mainHeight) {
                    if (targetHeight < mainHeight) {
                        that.css('height', targetHeight).css('top', mainHeight - targetHeight)
                        sel.css({
                            height: targetHeight
                        }).css('top', mainHeight - targetHeight)
                    } else {
                        that.css('height', mainHeight).css('top', 0)
                        sel.css('top', 0).css('height', mainHeight)
                    }
                }
            }
        } else {
            var targetBottom = that.css('bottom');
            if (parseInt(targetBottom) < 0) {
                if (targetHeight >= mainHeight) {
                    that.css('height', mainHeight).css('bottom', 0)
                    sel.css('top', 0).css('height', mainHeight)
                } else {
                    that.css('height', targetHeight).css('bottom', 0)
                    sel.css('top', mainHeight - targetHeight).css('height', targetHeight)
                }
            } else {
                if (targetHeight + parseInt(targetTop) > mainHeight) {
                    if (targetHeight > mainHeight) {
                        that.css('height', mainHeight).css('bottom', 0)
                        sel.css('top', 0).css('height', mainHeight)
                    } else {
                        that.css('height', targetHeight).css('bottom', mainHeight - targetHeight)
                        sel.css('top', 0).css('height', targetHeight)
                    }
                }
            }
        }
    }
    switch (x.toString() + y.toString()) {
        case '00':
            correct()
            break; //左 上
        case '10':
            var left = (mainWidth - targetWidth) / 2,
                top = sel.css('top');
            that.css('left', left + 'px').css('top', top);
            sel.css('left', left + 'px').css('top', top);
            correct()
            break; //居中 上
        case '20':
            var right = mainWidth - targetWidth - parseInt(sel.css('left')),
                top = sel.css('top'),
                width = that.width(),
                zIndex = that.css('zIndex') || 0,
                overflow = that.css('overflow') || 'auto',
                height = that.height();
            that.removeAttr('style');
            that.css({
                zIndex: zIndex,
                width: width,
                height: height,
                position: 'absolute',
                right: right + 'px',
                top: top,
                overflow: overflow
            })
            correct()
            break; //右 上
        case '30':
            var top = sel.css('top');
            that.css({
                width: mainWidth,
                left: 0
            });
            sel.css({
                width: mainWidth,
                left: 0
            })
            correct()
            break; //满 上
        case '01':
            var top = (mainHeight - targetHeight) / 2;
            that.css('top', top + 'px')
            sel.css('top', top + 'px')
            correct()
            break; //左中
        case '11':
            var top = (mainHeight - targetHeight) / 2,
                left = (mainWidth - targetWidth) / 2;
            that.css('top', top + 'px').css('left', left + 'px')
            sel.css('top', top + 'px').css('left', left + 'px')
            correct()
            break; //中中
        case '21':
            var top = (mainHeight - targetHeight) / 2,
                right = mainWidth - targetWidth - parseInt(sel.css('left')),
                width = that.width(),
                zIndex = that.css('zIndex') || 0,
                overflow = that.css('overflow') || 'auto',
                height = that.height();
            that.removeAttr('style');
            that.css({
                zIndex: zIndex,
                width: width,
                height: height,
                position: 'absolute',
                right: right + 'px',
                top: top,
                overflow: overflow
            })
            sel.css('top', top + 'px')
            correct()
            break; //右中
        case '31':
            var top = (mainHeight - targetHeight) / 2;
            that.css('top', top + 'px').css('width', mainWidth).css('left', 0)
            sel.css('top', top + 'px').css('width', mainWidth).css('left', 0)
            correct()
            break; //满中
        case '02':
            var bottom = mainHeight - targetHeight - (parseInt(sel.css('top'))),
                left = sel.css('left'),
                width = that.width(),
                zIndex = that.css('zIndex') || 0,
                overflow = that.css('overflow') || 'auto',
                height = that.height();
            that.removeAttr('style');
            that.css({
                zIndex: zIndex,
                width: width,
                height: height,
                position: 'absolute',
                left: left,
                bottom: bottom + 'px',
                overflow: overflow
            })
            correct()
            break; //左下
        case '12':
            var bottom = mainHeight - targetHeight - (parseInt(sel.css('top'))),
                width = that.width(),
                zIndex = that.css('zIndex') || 0,
                height = that.height(),
                overflow = that.css('overflow') || 'auto',
                left = (mainWidth - targetWidth) / 2;
            that.removeAttr('style');
            that.css({
                zIndex: zIndex,
                width: width,
                height: height,
                position: 'absolute',
                left: left,
                bottom: bottom + 'px',
                overflow: overflow
            })
            sel.css('top', top + 'px').css('left', left + 'px')
            correct()
            break; //中下
        case '22':
            var bottom = mainHeight - targetHeight - (parseInt(sel.css('top'))),
                right = mainWidth - targetWidth - parseInt(sel.css('left')),
                width = that.width(),
                zIndex = that.css('zIndex') || 0,
                overflow = that.css('overflow') || 'auto',
                height = that.height();
            that.removeAttr('style');
            that.css({
                zIndex: zIndex,
                width: width,
                height: height,
                position: 'absolute',
                right: right + 'px',
                bottom: bottom + 'px',
                overflow: overflow
            })
            correct()
            break; //右下
        case '32':
            var bottom = mainHeight - targetHeight - (parseInt(sel.css('top'))),
                right = mainWidth - targetWidth - (parseInt(sel.css('left'))),
                width = that.width(),
                zIndex = that.css('zIndex') || 0,
                overflow = that.css('overflow') || 'auto',
                height = that.height();
            that.removeAttr('style');
            that.css({
                zIndex: zIndex,
                width: mainWidth,
                height: height,
                position: 'absolute',
                left: 0,
                bottom: bottom + 'px',
                overflow: overflow
            })
            sel.css('width', mainWidth).css('left', 0)
            correct()
            break; //满下
        case '03':
            var left = sel.css('left');
            that.css('left', left).css('height', mainHeight).css('top', 0)
            sel.css('left', left).css('height', mainHeight).css('top', 0)
            correct()
            break; //左满
        case '13':
            var left = (mainWidth - targetWidth) / 2;
            that.css('left', left + 'px').css('height', mainHeight).css('top', 0)
            sel.css('left', left + 'px').css('height', mainHeight).css('top', 0)
            correct()
            break; //中满
        case '23':
            var right = mainWidth - targetWidth - parseInt(sel.css('left')),
                width = that.width(),
                zIndex = that.css('zIndex') || 0,
                overflow = that.css('overflow') || 'auto',
                height = that.height();
            that.removeAttr('style');
            sel.css('height', mainHeight).css('top', 0)
            that.css({
                zIndex: zIndex,
                width: width,
                height: mainHeight,
                position: 'absolute',
                right: right + 'px',
                top: 0,
                overflow: overflow
            })
            correct()
            break; //右满
        case '33':
            that.css({
                width: mainWidth,
                height: mainHeight,
                top: 0,
                left: 0
            })
            sel.css({
                width: mainWidth,
                height: mainHeight,
                top: 0,
                left: 0
            })
            correct()
            break; //满满
    }
}
Drag.prototype.dragDiv = function() {
    var that = $(this[0]),
        _this = this[0],
        mainWidth = $('#cnm').width(),
        mainHeight = $('#cnm').height(),
        html = $('.selector');
    html.on('mousedown', function(event) {
        var e = event || window.event,
            t = e.target || e.srcElement,
            //鼠标按下时的坐标x1,y1
            x1 = e.clientX,
            y1 = e.clientY,
            //鼠标按下时的左右偏移量
            dragLeft = this.offsetLeft,
            dragTop = this.offsetTop;
        document.onmousemove = function(event) {
            var e = event || window.event,
                t = e.target || e.srcElement,
                //鼠标移动时的动态坐标
                x2 = e.clientX,
                y2 = e.clientY,
                //鼠标移动时的坐标的变化量
                x = x2 - x1,
                targetWidth = that.width(),
                targetHeight = that.height(),
                y = y2 - y1;
            if (parseInt(_this.style.left) == 0 || parseInt(_this.style.left)) {
                if (dragLeft + x >= 0 && dragLeft + x + targetWidth <= mainWidth) {
                    _this.style.left = (dragLeft + x) + 'px';
                    html[0].style.left = (dragLeft + x) + 'px';
                } else if (dragLeft + x + targetWidth > mainWidth) {
                    _this.style.left = mainWidth - targetWidth;
                    html[0].style.left = mainWidth - targetWidth;
                } else {
                    _this.style.left = '0px'
                    html[0].style.left = '0px'
                }
            } else {
                if (mainWidth - dragLeft - x - parseInt(targetWidth) > 0 && mainWidth - dragLeft - x <= mainWidth) {
                    _this.style.right = (mainWidth - dragLeft - x - parseInt(targetWidth)) + 'px'
                    html[0].style.left = (dragLeft + x) + 'px';
                } else if (mainWidth - dragLeft - x > mainWidth) {
                    _this.style.right = mainWidth - targetWidth
                    html[0].style.left = '0px'
                } else {
                    _this.style.right = '0px'
                    html[0].style.left = mainWidth - that.width()
                }
            }
            if (parseInt(_this.style.top) == 0 || parseInt(_this.style.top)) {
                if (dragTop + y >= 0 && dragTop + y + targetHeight <= mainHeight) {
                    _this.style.top = (dragTop + y) + 'px';
                    html[0].style.top = (dragTop + y) + 'px';
                } else if (dragTop + y + targetHeight > mainHeight) {
                    _this.style.top = mainHeight - targetHeight;
                    html[0].style.top = mainHeight - targetHeight;
                } else {
                    _this.style.top = '0px'
                    html[0].style.top = '0px'
                }
            } else {
                if (mainHeight - dragTop - y - parseInt(targetHeight) > 0 && mainHeight - dragTop - y <= mainHeight) {
                    _this.style.bottom = (mainHeight - dragTop - y - parseInt(targetHeight)) + 'px'
                    html[0].style.top = (dragTop + y) + 'px';
                } else if (mainHeight - dragTop - y > mainHeight) {
                    _this.style.bottom = mainHeight - targetHeight;
                    html[0].style.top = 0;
                } else {
                    _this.style.bottom = '0px'
                    html[0].style.top = mainHeight - that.height()
                }
            }
        }
        document.onmouseup = function() {
        	if(_this.func){
        		_this.func.call(_this)
        	}
            this.onmousemove = null;
            this.onmouseup = null;
        }
    })
}
Drag.prototype.planeLeft = function() {
    var that = $(this[0]);
    var sel = $('.selector');
    var targetWidth = that.width(),
        targetHeight = that.height(),
        zIndex = that.css('zIndex') || 0,
        flag = (parseInt(that.css('top')) == 0 || parseInt(that.css('top'))),
        overflow = that.css('overflow') || 'auto',
        y = flag ? that.css('top') : that.css('bottom');
    that.removeAttr('style');
    that.css({
        position: 'absolute',
        width: targetWidth,
        height: targetHeight,
        left: 0,
        zIndex: zIndex,
        overflow: overflow
    })
    sel.css({
        left: 0
    })
    if (flag) {
        that.css('top', y)
    } else {
        that.css('bottom', y)
    }
    that.attr('plane', '0')
    this.tagreset($(that).attr('plane'), $(that).attr('vertical'))
}
Drag.prototype.planeMiddle = function() {
    var that = $(this[0]);
    var sel = $('.selector');
    var targetWidth = that.width(),
        mainWidth = $('#cnm').width(),
        left = (mainWidth - targetWidth) / 2,
        targetLeft = that.css('left');
    that.css('left', left + 'px')
    sel.css('left', left + 'px')
    that.attr('plane', '1')
    this.tagreset($(that).attr('plane'), $(that).attr('vertical'))
}
Drag.prototype.planeRight = function() {
    var that = $(this[0]);
    var sel = $('.selector');
    var targetWidth = that.width(),
        mainWidth = $('#cnm').width(),
        targetHeight = that.height(),
        zIndex = that.css('zIndex') || 0,
        flag = (parseInt(that.css('top')) == 0 || parseInt(that.css('top'))),
        overflow = that.css('overflow') || 'auto',
        y = flag ? that.css('top') : that.css('bottom');
    that.removeAttr('style');
    that.attr('plane', '2')
    this.tagreset($(that).attr('plane'), $(that).attr('vertical'))
    that.css({
        position: 'absolute',
        width: targetWidth,
        height: targetHeight,
        right: 0,
        zIndex: zIndex,
        overflow: overflow
    })
    sel.css({
        left: (mainWidth - targetWidth) + 'px',
        width: targetWidth
    })
    if (flag) {
        that.css('top', y)
    } else {
        that.css('bottom', y)
    }
}
Drag.prototype.planeFull = function() {
    var that = $(this[0]);
    var sel = $('.selector');
    var targetWidth = that.width(),
        targetHeight = that.height(),
        mainWidth = $('#cnm').width();
    that.css({
        width: mainWidth,
        height: targetHeight,
        left: 0
    });
    sel.css({
        width: mainWidth,
        left: 0
    })
    that.attr('plane', '3')
    this.tagreset($(that).attr('plane'), $(that).attr('vertical'))
}
Drag.prototype.verticalTop = function() {
    var that = $(this[0]);
    var sel = $('.selector');
    that.attr('vertical', '0')
    that.css({
        top: 0
    });
    sel.css({
        top: 0
    })
    this.tagreset($(that).attr('plane'), $(that).attr('vertical'))
}
Drag.prototype.verticalMiddle = function() {
    var that = $(this[0]);
    var sel = $('.selector');
    var targetHeight = that.height(),
        mainHeight = $('#cnm').height(),
        top = (mainHeight - targetHeight) / 2;
    that.attr('vertical', '1')
    this.tagreset($(that).attr('plane'), $(that).attr('vertical'))
    that.css({
        top: top + 'px'
    });
    sel.css({
        top: top + 'px'
    })
}
Drag.prototype.verticalBottom = function() {
    var that = $(this[0]);
    var sel = $('.selector');
    var targetWidth = that.width(),
        mainWidth = $('#cnm').width(),
        mainHeight = $('#cnm').height(),
        targetHeight = that.height(),
        zIndex = that.css('zIndex') || 0,
        flag = (parseInt(that.css('left')) == 0 || parseInt(that.css('left'))),
        overflow = that.css('overflow') || 'auto',
        y = flag ? that.css('left') : that.css('right');
    that.removeAttr('style');
    that.css({
        position: 'absolute',
        width: targetWidth,
        height: targetHeight,
        bottom: 0,
        zIndex: zIndex,
        overflow: overflow
    })
    sel.css({
        top: mainHeight - targetHeight
    })
    if (flag) {
        that.css('left', y)
    } else {
        that.css('right', y)
    }
    that.attr('vertical', '2')
    this.tagreset($(that).attr('plane'), $(that).attr('vertical'))
}
Drag.prototype.verticalFull = function() {
    var that = $(this[0]);
    var sel = $('.selector');
    var mainHeight = $('#cnm').height(),
        targetWidth = that.width();
    that.css({
        width: targetWidth,
        height: mainHeight,
        top: 0
    });
    sel.css({
        hieght: mainHeight,
        top: 0
    })
    that.attr('vertical', '3')
    this.tagreset($(that).attr('plane'), $(that).attr('vertical'))
}
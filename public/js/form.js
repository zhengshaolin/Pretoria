if ($ && jQuery) {

    $(document).ready(function() {
        Editor.initForm();
    });

    $('.e_creat').click(function() {
        var type = $(this).attr('type');
        Editor.add(type);
    });
    $('.e_delete').on('click', function() {
        var type = $(this).arrt('type');
        Editor.remove(type);
    });
    $('.e_publish').click(function() {
        var product_id = $('#product_id').val();
        Editor.publish(product_id);
    });

    $('.update_item').on('blur', function() {
        var type = $(this).attr('id');
        Editor.renderPI();
    });

    var s;
    $('#cnm').on('click', function(e) {
        s = Drag(e);
        $('#btn,#btn1,#btn2,#btn3,#btn4,#btn5,#btn6,#btn7').unbind('click')
        $('#btn').on('click', function() {
            s.planeLeft();
        })
        $('#btn1').on('click', function() {
            console.log(s)
            s.planeMiddle()
        })
        $('#btn2').on('click', function() {
            console.log(s)
            s.planeRight()
        })
        $('#btn3').on('click', function() {
            console.log(s)
            s.planeFull()
        })
        $('#btn4').on('click', function() {
            console.log(s)
            s.verticalTop()
        })
        $('#btn5').on('click', function() {
            console.log(s)
            s.verticalMiddle()
        })
        $('#btn6').on('click', function() {
            console.log(s)
            s.verticalBottom()
        })
        $('#btn7').on('click', function() {
            console.log(s)
            s.verticalFull()
        })
    })
    $('#cnm').on('mousedown', function(e) {
        if (e.which == 3) {
            $(this).smartMenu([
                [{
                    text: '浮动到最上层',
                    func: function() {
                        //$(s[0]).css('zIndex',)
                    }
                }],
                [{
                    text: '删除选中层',
                    func: function() {
                        $(s[0]).remove();
                        $('.selector').hide()
                        /*$.ajax({

                })*/
                    }
                }]
            ], {
                offsetX: 2,
                offsetY: 2,
                name: ''
            })
        }
    });
};
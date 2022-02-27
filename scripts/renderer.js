

class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(this.ctx);
                break;
            case 1:
                this.drawSlide1(this.ctx);
                break;
            case 2:
                this.drawSlide2(this.ctx);
                break;
            case 3:
                this.drawSlide3(this.ctx);
                break;
        }
    }

    randomy() {
        return Math.floor(Math.random() * this.canvas.height);
    }
    randomx() {
        return Math.floor(Math.random() * this.canvas.width);
    }

    // ctx:          canvas context
    drawSlide0(ctx) {
        let y1 = this.randomy();
        let x1 = this.randomx();
        let y2 = this.randomy();
        let x2 = this.randomx();
        let left_bottom = {x: x1, y: y1};
        let right_top = {x: x2, y: y2};
        this.drawRectangle(left_bottom, right_top, [255, 255, 0], ctx);
    }

    // ctx:          canvas context
    drawSlide1(ctx) {
        let a = {x: (this.canvas.width/2), y: (this.canvas.height/2)};
        let b = 100;
        this.drawCircle(a, b, [255, 255, 0], ctx);

    }

    // ctx:          canvas context
    drawSlide2(ctx) {

    }

    // ctx:          canvas context
    drawSlide3(ctx) {

    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawRectangle(left_bottom, right_top, color, ctx) {
        let left_top = {x:left_bottom.x, y: right_top.y};
        let right_bottom = {x: right_top.x, y: left_bottom.y};
        this.drawLine(left_bottom, left_top , color, ctx);
        this.drawLine(left_top, right_top, color, ctx);
        this.drawLine(right_bottom, right_top, color, ctx);
        this.drawLine(left_bottom, right_bottom, color, ctx);

        
    }

    //radians, not degrees
    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) {
        let degrees = (360/this.num_curve_sections);
        let newAngle = degrees/2;
        let starting = {x: (center.x + (radius * Math.cos(newAngle * Math.PI / 180))),y: (center.y + (radius * Math.sin(newAngle* Math.PI / 180)))};
        let a = starting;
        let placeHolder;
        for(let i = 0; i < this.num_curve_sections; i++) {
            newAngle = newAngle + degrees
            if (degrees > 360) {
                this.drawLine(starting, a, color, ctx);
                break
            }
            placeHolder =  {x: (center.x + (radius * Math.cos(newAngle * Math.PI / 180))),y: (center.y + (radius * Math.sin(newAngle* Math.PI / 180)))};
            this.drawLine(a, placeHolder, color, ctx);
            a = placeHolder;
        }

        
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawLine(pt0, pt1, color, ctx)
    {
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3]/255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }
}

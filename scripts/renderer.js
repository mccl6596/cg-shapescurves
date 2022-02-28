

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
        this.drawRectangle(left_bottom, right_top, [153,153,255,255], ctx);
    }

    // ctx:          canvas context
    drawSlide1(ctx) {
        let a = {x: (this.canvas.width/2), y: (this.canvas.height/2)};
        let b = 100;
        this.drawCircle(a, b, [255, 153, 51, 255], ctx);

    }

    // ctx:          canvas context
    drawSlide2(ctx) {
        let a = {x: 100, y:100};
        let a1 = {x: 100, y:300};
        let b = {x: 300, y:100};
        let b1 = {x: 300, y:300};
        this.drawBezierCurve(a, a1, b1, b, [0, 163, 76, 255], ctx);
    }

    // ctx:          canvas context
    drawSlide3(ctx) {
        let color = [0,0,0,255];
        //m
        let m3 = {x:50, y:280};
        let m4 = {x:50, y:300};
        let m5 = {x:90, y:280};
        let m6 = {x:90, y:300};
        let mp1 = {x:10, y:300};
        let mp2 = {x:10, y:400};
        let mp3 = {x:50, y:400};
        let mp4 = {x:50, y:300};
        let mp5 = {x:50, y:300};
        let mp6 = {x:50, y:400};
        let mp7 = {x:90, y:400};
        let mp8 = {x:90, y:300};
        this.drawLine({x:10, y:280}, {x:10, y:380}, color, ctx);
        this.drawLine(m3, m4, color, ctx);
        this.drawLine(m5, m6, color, ctx);
        this.drawBezierCurve(mp1, mp2, mp3, mp4, color, ctx);
        this.drawBezierCurve(mp5, mp6, mp7, mp8, color, ctx);
        //a
        this.drawLine({x: 190, y: 280}, {x: 190, y: 370}, color, ctx);
        this.drawCircle({x:145, y: 325}, 45, color, ctx);
        //c
        this.drawLine({x: 210, y: 310}, {x: 210, y: 340}, color, ctx);
        this.drawBezierCurve({x: 210, y: 340}, {x: 210, y: 385}, {x: 270, y: 385}, {x: 270, y: 340}, color, ctx);
        this.drawBezierCurve({x: 210, y: 310}, {x: 210, y: 265}, {x: 270, y: 265}, {x: 270, y: 310}, color, ctx);

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
        if (this.show_points == 1) {
            this.drawPoint(left_top, ctx);
            this.drawPoint(left_bottom, ctx);
            this.drawPoint(right_top, ctx);
            this.drawPoint(right_bottom, ctx);
        }

        
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
                this.drawPoint(starting, ctx);
                break
            }
            placeHolder =  {x: (center.x + (radius * Math.cos(newAngle * Math.PI / 180))),y: (center.y + (radius * Math.sin(newAngle* Math.PI / 180)))};
            if (this.show_points == 1) {
                this.drawPoint(placeHolder, ctx);
            }
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
        let counter = 1.0/this.num_curve_sections;
        let t = counter;
        let starting = {x: pt0.x, y: pt0.y};
        if (this.show_points == 1) {
            this.drawPoint(starting, ctx);
        }
        let placeHolder;
        for(let i = 0; i < this.num_curve_sections; i++) {
            placeHolder = {x:(Math.pow((1-t), 3)*pt0.x)+(3*Math.pow((1-t), 2)*t*pt1.x)+(3*(1-t)*Math.pow(t, 2)*pt2.x)+(Math.pow(t, 3)*pt3.x), y: (Math.pow((1-t), 3)*pt0.y)+(3*Math.pow((1-t), 2)*t*pt1.y)+(3*(1-t)*Math.pow(t, 2)*pt2.y)+(Math.pow(t, 3)*pt3.y)};
            this.drawLine(starting, placeHolder, color, ctx);
            if (this.show_points == 1) {
                this.drawPoint(placeHolder, ctx);
            }
            t = t + counter;
            starting = placeHolder;
        }
    }

    drawPoint(point, ctx) {
        let a = {x:point.x-2, y: point.y-2};
        let b = {x: point.x-2, y: point.y+2};
        let c = {x:point.x+2, y: point.y+2};
        let d = {x: point.x+2, y: point.y-2};
        this.drawLine(a, b, [0, 0, 0, 255], ctx);
        this.drawLine(b, c, [0, 0, 0, 255], ctx);
        this.drawLine(c, d, [0, 0, 0, 255], ctx);
        this.drawLine(d, a, [0, 0, 0, 255], ctx);
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

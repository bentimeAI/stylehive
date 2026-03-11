from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, filename):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    margin = size // 10
    draw.rounded_rectangle([margin, margin, size-margin, size-margin], 
                          radius=size//5, fill=(102, 126, 234, 255))
    
    draw.rounded_rectangle([margin, margin, size-margin, size-margin], 
                          radius=size//5, outline=(240, 147, 251, 255), width=size//30)
    
    try:
        font_size = size // 3
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Arial Bold.ttf", font_size)
        except:
            font = ImageFont.load_default()
        
        text = "SH"
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        x = (size - text_width) // 2
        y = (size - text_height) // 2 - bbox[1]
        
        draw.text((x, y), text, fill=(255, 255, 255, 255), font=font)
    except:
        pass
    
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    img.save(filename, 'PNG')
    print(f"Created: {filename}")

create_icon(192, 'icons/icon-192x192.png')
create_icon(512, 'icons/icon-512x512.png')
create_icon(1024, 'icons/icon-1024x1024.png')

print("\n✅ 图标生成完成！")

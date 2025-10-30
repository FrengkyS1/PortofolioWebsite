import re  
  
with open('styles.css.bak', 'r', encoding='utf-8') as f:  
    content = f.read()  
  
content = re.sub(  
    r'\.hero-title \{\s+font-size: 3\.5rem;\s+margin-bottom: 1rem;\s+animation: fadeInUp 1s ease;',  
    '.hero-title {\n    font-size: 3.5rem;\n    margin-bottom: 1rem;\n    animation: fadeInUp 1s ease;\n    text-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(254, 127, 45, 0.2);',  
    content,  
    flags=re.DOTALL  
)  
  
with open('styles.css', 'w', encoding='utf-8') as f:  
    f.write(content)  

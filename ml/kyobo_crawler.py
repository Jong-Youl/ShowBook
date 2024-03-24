from urllib.request import Request, urlopen
from bs4 import BeautifulSoup as bs
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import MySQLdb
import time
import random
import logging

# 로그 설정
logging.basicConfig(filename='crawler.log', level=logging.ERROR, format='%(asctime)s - %(levelname)s - %(message)s')

#db 연결
conn = MySQLdb.connect(
    user="root",
    passwd="1234",
    host="127.0.0.1",
    db="test_db"
    # charset="utf-8"
)

# 커서 생성
cursor = conn.cursor()

# Chrome 옵션 설정
chrome_options = Options()
chrome_options.add_argument('--headless')  # 브라우저를 표시하지 않음
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')
chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3")

# Chrome 드라이버 시작
driver = webdriver.Chrome(ChromeDriverManager().install(), options=chrome_options)

start_url = "https://product.kyobobook.co.kr/category/KOR/"
base_num = ["01", "03", "05", "07", "08", "09", "11", "13", "15", "17", "19", "21"]


crawling_urls = []

# 목표 crawling_urls를 확보
# before = 약 11초
for num in range(0, len(base_num)):

    # 각 카테 고리별 url
    target_url = start_url + base_num[num]
    # URL에서 HTML 가져오기
    req = Request(target_url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urlopen(req).read()
    
    soup = bs(html, "lxml")
    
    tmp_list = soup.find('div', {'class' : 'snb_wrap'}).find('ul').findAll('a', {'class' : "snb_link"})   
    
    for tmp in tmp_list:
        url = tmp['href']
        crawling_urls.append(url)


# # before = 약 22분 51초
for idx1 in range(0, len(crawling_urls)):
    #key = 장르
    #value = url
    category_number = crawling_urls[idx1].split("/")[-1][:2]

    if category_number in base_num:
        category = base_num.index(category_number) + 1
        
    #각 목록 페이지네이션 번호
    for idx2 in range(0, 25):
        
        new_url = f"{crawling_urls[idx1]}#?page={idx2 + 1}&type=all&per=20&sort=new"

        driver.get(new_url)
        driver.implicitly_wait(60)

        # URL에서 HTML 가져오기
        soup = bs(driver.page_source, 'lxml')
        tmp_list = soup.find('div', class_='switch_prod_wrap view_type_list').findAll('a', {'class':'prod_info'})
        
        for tmp in tmp_list:
            detail_link = tmp['href']
            driver.get(detail_link)
            driver.implicitly_wait(60)
            
            try:    
                soup = bs(driver.page_source, 'lxml')
                # 제목, 저자, 출판사, 총 페이지 수, 책 표지 url, 책 설명, 카테고리
                title = soup.find('span', {"class" : "prod_title"}).get_text(strip=True)
                author = soup.find('div', {'class' : 'prod_detail_view_wrap'}).find('div', {'class' : 'author'}).find('a').get_text(strip=True)
                publisher = soup.find('div', {'class' : 'prod_info_wrap'}).find('a', {'class': 'btn_publish_link'}).get_text(strip=True)
                page_info = soup.find('div', {'class' : 'product_detail_area basic_info'}).find('th', text='쪽수').find_next_sibling('td').get_text(strip=True)
                if "쪽" not in page_info:
                    continue  # "쪽"이 포함되어 있지 않으면 다음 반복으로 건너뜁니다.
                total_page = int(page_info[:-1])
                book_image_url = soup.find('div', class_='blur_img_wrap').find('div', {'class' : 'blur_img_box'}).find('img')['src']
                info_texts = soup.find('div', {'class' : 'product_detail_area book_intro'}).find('div', {'class' : 'intro_bottom'}).find_all('div', {'class' : 'info_text'})
                description = '\n'.join([info_text.get_text(strip=True) for info_text in info_texts])
                #카테고리는 규칙으로 찾아오는 걸로

            except AttributeError as e:
                logging.error(f"Error in category {category}, detail page {detail_link}: {e}")
                continue

            cursor.execute(        
                "INSERT INTO Book (title, author, publisher, total_page, book_image_url, description, category) "
                "VALUES (%s, %s, %s, %s, %s, %s, %s)",
                (title, author, publisher, total_page, book_image_url, description, category)
            )
            #db 저장
            conn.commit()
            time.sleep(random.uniform(1, 11))

conn.close()
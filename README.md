# 🎲 Zar Oyunu

Bu proje, HTML5 canvas kullanarak yapılmış bir mini zar oyunudur.  
Fareyle nişan al, zar at, çıkan sayıya göre ilerle, düşmanları vur ve mümkün olduğunca uzun süre hayatta kal!

 Oyun bağlantısı: [https://muallacapar.github.io/JSOyun/](https://muallacapar.github.io/JSOyun/)
![Ekran görüntüsü 2025-05-22 004533](https://github.com/user-attachments/assets/be2dd923-0d12-46c0-9c3a-5397e459799d)
![Ekran görüntüsü 2025-05-22 004533](https://github.com/user-attachments/assets/0fb68ffa-3fb6-4696-8da6-fb681e3449cc)




##  Oyun Hedefi

- Zar at (🖱️ tıklayarak)
- Çıkan sayıya göre hareket et
- Düşmanlardan kaç veya onları vur
- Hayatta kalma sürene göre puan kazan



##  Kontroller

Eylem                      Kontrol       

Zar at & ateş et           Fare tıklaması 
Nişan al                   Fare yönü     
Patlama efekti             Boşluk (görsel amaçlı) 



##  Kurulum (Yerel Geliştirme İçin)


git clone https://github.com/muallacapar/muallacapar.github.io.git
cd muallacapar.github.io/JSOyun

Deployment
Proje GitHub Pages ile canlıya alınmıştır.
Canlı olarak oynamak için:

https://muallacapar.github.io/JSOyun/

## Running the Tests

Bu proje, manuel test yöntemleriyle kontrol edilmiştir.  
Kullanıcı etkileşimlerine, oyun mekaniğine ve ekran geri bildirimlerine göre testler yapılmıştır.

###  End-to-End Tests (Uçtan Uca Testler)

Bu testler oyuncunun oyunla olan tam etkileşimini kapsar:

-  **Zar atma** – Fareyle tıklanarak zar atılıyor ve çıkan sayı karakteri doğru oranda hareket ettiriyor mu?
-  **Yön kontrolü** – Fare hareketine göre karakterin açısı dinamik olarak güncelleniyor mu?
-  **Mermi atışı** – Zar atıldığında mermi ateşleniyor mu, doğru açıyla mı gidiyor?
-  **Düşman çarpışması** – Mermi düşmana çarptığında düşman yok ediliyor mu?
-  **Can ve Skor sistemi** – Oyuncu hasar aldığında can azalıyor mu, skor sürece göre artıyor mu?
-  **Game Over ekranı** – Can sıfırlandığında “Game Over” ekranı ve skor görünür mü?
-  **Yeniden Başlat** – Restart butonu tüm oyunu düzgün bir şekilde sıfırlıyor mu?

###  Coding Style & Yapı Testleri

- Dosyalar ayrık ve okunabilir yapıda mı?
- Fonksiyon isimleri anlamlı mı?
- Gereksiz tekrar eden kod var mı?
- HTML dosyasındaki bağlantılar (`script`, `link`) göreceli yollarla doğru bağlanmış mı?

###  Ekstra Manuel Kontroller

-  Ses efektleri doğru anda çalıyor mu?
-  Arka plan animasyonları (yıldızlar) düzgün çalışıyor mu?
-  Hardcore modu düşman hızını ve mermi atışlarını artırıyor mu?
-  Ana sayfa → oyun geçişi ve mod seçimi sorunsuz mu?

> Otomatik test çerçevesi kullanılmamıştır, ancak proje kapsamı dahilinde manuel testlerle tüm özellikler güvenilir şekilde kontrol edilmiştir.

##  License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this project for personal or commercial purposes — as long as you include proper credit to the original author.

See the full license in the [LICENSE](LICENSE) file.

##  Authors

### Mualla Çapar

-  Öğrenci geliştirici olarak bu projeyi HTML5 ve JavaScript kullanarak bireysel olarak geliştirdi.  
-  Oyun mekaniği, arayüz, ses efektleri, modlar ve skor sistemi gibi özellikleri tasarlayıp kodladı.  

 GitHub: [@muallacapar](https://github.com/muallacapar)  

##  Acknowledgments

Bu proje bireysel olarak geliştirilmiştir. Ancak ilham, rehberlik ve bazı teknik yönlendirmelerde aşağıdaki kaynaklardan faydalanılmıştır:

- [ChatGPT](https://chat.openai.com) – Oyun mekaniği, hata ayıklama, Git komutları ve dosya yapısı konusunda destek sağladı  
- [MDN Web Docs](https://developer.mozilla.org/) – HTML5 Canvas API ve JavaScript dökümantasyonu  
- [OpenGameArt.org](https://opengameart.org/) – Ücretsiz ses efektleri (lazer ve patlama sesi)  
- [Stack Overflow](https://stackoverflow.com/) – JavaScript hatalarına yönelik topluluk çözümleri  

> Tüm açık kaynak topluluklarına ve geliştiricilere teşekkür ederim.

## youtube videosu
https://youtu.be/KZxg9UKKTyg

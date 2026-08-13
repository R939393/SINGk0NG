name: main.yml
on:
  push:
    branches: [ 932 ]
  workflow_dispatch:

concurrency:
  group: hanz-bot-${{ github.ref }}
  cancel-in-progress: true

jobs:
  system-runner:
    runs-on: macos-latest  # <--- MENGGUNAKAN SERVER MAC (APPLE)
    
    permissions:
      actions: write
      contents: write

    steps:
      - name: HANZ DOWNLOAD DATA
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.GH_TOKEN }} 

      - name: HANZ INSTALL FFPEG & IMAGEMAGICK
        run: |
          echo "[ HANZ ] Menginstal dependensi media di macOS..."
          # ---> PERINTAH DIBAWAH INI BERUBAH KHUSUS UNTUK MAC <---
          brew install ffmpeg imagemagick webp
          
      # ... (Langkah ke bawahnya sama persis dengan skrip asli Anda)

      - name: HANZ BERSIHKAN FAILURE DI AWAL
        env:
          GH_TOKEN: ${{ secrets.GH_TOKEN }}
        run: |
          echo "[ HANZ ] Mengecek dan menghapus silang merah dari run sebelumnya..."
          gh run list --status failure --json databaseId -q '.[].databaseId' | xargs -I {} gh run delete {} || true
          gh run list --status cancelled --json databaseId -q '.[].databaseId' | xargs -I {} gh run delete {} || true

      - name: HANZ ANTI LIMIT ( START )
        timeout-minutes: 300
        continue-on-error: true
        # ---> PERINTAH LOOPING SEDIKIT BERBEDA DI WINDOWS (PowerShell) <---
        run: |
          while ($true) {
            echo " HANZ MEMULAI PROJECT"
            npm start
            echo " [ HANZ ERORR ] MEMULAI ULANG PROJECT"
            Start-Sleep -Seconds 1
          }

      - name: HANZ MENYIMPAN DATA KE GITHUB
        if: always() 
        run: |
          echo "[ HANZ ] Mengecek file baru atau perubahan data..."
          git config --global user.name "R939393"
          git config --global user.email "pejoh0011@gmail.com"
          git add .
          
          # Cek perbedaan menggunakan PowerShell
          if (git diff --staged --quiet) {
            echo "[ HANZ ] Tidak ada file yang berubah untuk disimpan."
          } else {
            git commit -m "Update Data Session [skip ci]"
            git push "https://${{ secrets.GH_TOKEN }}@github.com/${{ github.repository }}.git" HEAD:932
            echo "[ HANZ ] Berhasil menyimpan file ke repositori!"
          }

      - name: HANZ MENGHAPUS PROJECT
        if: always() 
        env:
          GH_TOKEN: ${{ secrets.GH_TOKEN }}
        run: |
          echo "HANZ MENGHAPUS SEMUA..."
          gh run list --status completed --json databaseId -q '.[].databaseId' | % { gh run delete $_ } || $true
          gh run list --status cancelled --json databaseId -q '.[].databaseId' | % { gh run delete $_ } || $true
          gh run list --status failure --json databaseId -q '.[].databaseId' | % { gh run delete $_ } || $true

      - name: HANZ MEMBUAT ULANG PROJECT 
        if: always() 
        env:
          GH_TOKEN: ${{ secrets.GH_TOKEN }}
        run: |
          echo " HANZ MEMBUAT ULANG PROJECT..."
          gh workflow run "main.yml" --ref 932

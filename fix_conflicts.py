from pathlib import Path
import re

files = [
    'app/components/statcards/statcards.tsx',
    'app/components/tables/RecentPaymentsTable.tsx',
    'app/components/charts/FeeAnalyticsChart.tsx',
    'app/components/charts/MothlyFeeActivity.tsx',
    'app/page.tsx',
    'app/student/dashboard/page.tsx'
]
pattern = re.compile(r'<<<<<<< HEAD\r?\n(.*?)\r?\n=======\r?\n(.*?)\r?\n>>>>>>>[^\r\n]*\r?\n', re.DOTALL)

for file_path in files:
    path = Path(file_path)
    text = path.read_text(encoding='utf-8')
    new_text = pattern.sub(lambda m: m.group(1), text)
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        print(f'Patched {file_path}')
    else:
        print(f'No changes for {file_path}')

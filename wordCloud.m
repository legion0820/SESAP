clear; clc;

load('GraphData.mat');

themeSums = sum(countMatch, 2);

words = string(themes);
counts = themeSums;

figure;
wordcloud(words, counts);
title('Theme Word Cloud');
saveas(gcf, fullfile('Images', 'wordcloud.png'));

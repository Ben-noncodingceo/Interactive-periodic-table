// 周期表应用主逻辑
class PeriodicTable {
    constructor() {
        this.elements = elementsData;
        this.showLanthanides = false;
        this.showActinides = false;
        this.currentProperty = 'electronegativity'; // 默认显示电负性
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderTable();
        this.renderLegends();
        this.updateActiveLegend();
    }

    setupEventListeners() {
        // 性质选择器
        document.getElementById('propertySelect').addEventListener('change', (e) => {
            this.currentProperty = e.target.value;
            this.renderTable();
            this.updateActiveLegend();
        });

        // 镧系/锕系切换按钮
        document.getElementById('toggleLanthanides').addEventListener('click', () => {
            this.showLanthanides = !this.showLanthanides;
            document.getElementById('toggleLanthanides').textContent = 
                this.showLanthanides ? '隐藏镧系元素' : '显示镧系元素';
            document.getElementById('toggleLanthanides').classList.toggle('active', this.showLanthanides);
            this.renderTable();
        });

        document.getElementById('toggleActinides').addEventListener('click', () => {
            this.showActinides = !this.showActinides;
            document.getElementById('toggleActinides').textContent = 
                this.showActinides ? '隐藏锕系元素' : '显示锕系元素';
            document.getElementById('toggleActinides').classList.toggle('active', this.showActinides);
            this.renderTable();
        });

        // 关闭详情按钮
        document.getElementById('closeDetail').addEventListener('click', () => {
            document.getElementById('elementDetail').classList.add('hidden');
        });
    }


    // 渲染周期表
    renderTable() {
        const table = document.getElementById('periodicTable');
        table.innerHTML = '';
        table.style.display = 'grid';
        table.style.gridTemplateColumns = 'repeat(18, 1fr)';
        
        // 创建元素映射
        const elementMap = new Map();
        this.elements.forEach(element => {
            if (!element.isLanthanide && !element.isActinide && element.group !== null) {
                elementMap.set(`${element.period}-${element.group}`, element);
            }
        });
        
        // 标准周期表布局：族号直接对应列号
        // 第1周期：H (1族) 在列1, He (18族) 在列18
        this.renderElementAtPosition(table, elementMap, 1, 1, 1);  // H
        this.renderElementAtPosition(table, elementMap, 1, 18, 18); // He
        
        // 第2周期：Li(1), Be(2), B(13), C(14), N(15), O(16), F(17), Ne(18)
        this.renderElementAtPosition(table, elementMap, 2, 1, 1);
        this.renderElementAtPosition(table, elementMap, 2, 2, 2);
        this.renderElementAtPosition(table, elementMap, 2, 13, 13);
        this.renderElementAtPosition(table, elementMap, 2, 14, 14);
        this.renderElementAtPosition(table, elementMap, 2, 15, 15);
        this.renderElementAtPosition(table, elementMap, 2, 16, 16);
        this.renderElementAtPosition(table, elementMap, 2, 17, 17);
        this.renderElementAtPosition(table, elementMap, 2, 18, 18);
        
        // 第3周期：Na(1), Mg(2), Al(13), Si(14), P(15), S(16), Cl(17), Ar(18)
        this.renderElementAtPosition(table, elementMap, 3, 1, 1);
        this.renderElementAtPosition(table, elementMap, 3, 2, 2);
        this.renderElementAtPosition(table, elementMap, 3, 13, 13);
        this.renderElementAtPosition(table, elementMap, 3, 14, 14);
        this.renderElementAtPosition(table, elementMap, 3, 15, 15);
        this.renderElementAtPosition(table, elementMap, 3, 16, 16);
        this.renderElementAtPosition(table, elementMap, 3, 17, 17);
        this.renderElementAtPosition(table, elementMap, 3, 18, 18);
        
        // 第4周期：K(1), Ca(2), Sc(3), Ti(4), V(5), Cr(6), Mn(7), Fe(8), Co(9), Ni(10), Cu(11), Zn(12), Ga(13), Ge(14), As(15), Se(16), Br(17), Kr(18)
        for (let group = 1; group <= 18; group++) {
            this.renderElementAtPosition(table, elementMap, 4, group, group);
        }
        
        // 第5周期：Rb(1), Sr(2), Y(3), Zr(4), Nb(5), Mo(6), Tc(7), Ru(8), Rh(9), Pd(10), Ag(11), Cd(12), In(13), Sn(14), Sb(15), Te(16), I(17), Xe(18)
        for (let group = 1; group <= 18; group++) {
            this.renderElementAtPosition(table, elementMap, 5, group, group);
        }
        
        // 第6周期：Cs(1), Ba(2), 然后直接跳到Hf(4)...
        // La(57)和Lu(71)都在镧系行显示
        this.renderElementAtPosition(table, elementMap, 6, 1, 1); // Cs
        this.renderElementAtPosition(table, elementMap, 6, 2, 2); // Ba
        // 跳过列3（La和Lu在镧系行）
        // Hf(4), Ta(5), W(6), Re(7), Os(8), Ir(9), Pt(10), Au(11), Hg(12), Tl(13), Pb(14), Bi(15), Po(16), At(17), Rn(18)
        for (let group = 4; group <= 18; group++) {
            this.renderElementAtPosition(table, elementMap, 6, group, group);
        }
        
        // 第7周期：Fr(1), Ra(2), 然后直接跳到Rf(4)...
        // Ac(89)和Lr(103)都在锕系行显示
        this.renderElementAtPosition(table, elementMap, 7, 1, 1); // Fr
        this.renderElementAtPosition(table, elementMap, 7, 2, 2); // Ra
        // 跳过列3（Ac和Lr在锕系行）
        // Rf(4), Db(5), Sg(6), Bh(7), Hs(8), Mt(9), Ds(10), Rg(11), Cn(12), Nh(13), Fl(14), Mc(15), Lv(16), Ts(17), Og(18)
        for (let group = 4; group <= 18; group++) {
            this.renderElementAtPosition(table, elementMap, 7, group, group);
        }
        
        // 渲染镧系元素 (第8行，从列3开始，La到Lu共15个元素)
        if (this.showLanthanides) {
            // 获取所有镧系相关元素：La(57)到Lu(71)
            const lanthanideSeries = this.elements.filter(e => e.number >= 57 && e.number <= 71).sort((a, b) => a.number - b.number);
            lanthanideSeries.forEach((element, index) => {
                this.createElementCell(table, element, 8, index + 3); // 从列3开始，La在列3，Lu在列17
            });
        }
        
        // 渲染锕系元素 (第9行，从列3开始，Ac到Lr共15个元素)
        if (this.showActinides) {
            // 获取所有锕系相关元素：Ac(89)到Lr(103)
            const actinideSeries = this.elements.filter(e => e.number >= 89 && e.number <= 103).sort((a, b) => a.number - b.number);
            actinideSeries.forEach((element, index) => {
                this.createElementCell(table, element, 9, index + 3); // 从列3开始，Ac在列3，Lr在列17
            });
        }
    }
    
    // 在指定位置渲染元素
    renderElementAtPosition(table, elementMap, period, group, col) {
        const element = elementMap.get(`${period}-${group}`);
        if (element) {
            this.createElementCell(table, element, period, col);
        }
    }
    
    // 创建元素单元格
    createElementCell(table, element, row, col) {
        const cell = document.createElement('div');
        cell.className = 'element-cell';
        
        if (element.radioactive) {
            cell.classList.add('radioactive');
        }
        
        const color = this.getPropertyColor(element, this.currentProperty);
        cell.style.backgroundColor = color;
        
        cell.innerHTML = `
            <span class="element-number">${element.number}</span>
            <span class="element-symbol">${element.symbol}</span>
            <span class="element-name">${element.name}</span>
        `;
        
        cell.addEventListener('click', () => this.showElementDetail(element));
        cell.style.gridRow = row;
        cell.style.gridColumn = col;
        table.appendChild(cell);
    }

    // 获取属性颜色
    getPropertyColor(element, property) {
        const value = element[property];
        if (value === null || value === undefined) {
            return '#e9ecef';
        }

        let min, max, colorScale;
        
        switch(property) {
            case 'electronegativity':
                min = 0.7; max = 4.0;
                colorScale = ['#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c', '#2e7d32', '#1b5e20'];
                break;
            case 'stability':
                min = 0; max = 1.0;
                colorScale = ['#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c'];
                break;
            case 'ionizationEnergy':
                min = 376; max = 2372;
                colorScale = ['#fff3e0', '#ffe0b2', '#ffcc80', '#ffb74d', '#ffa726', '#ff9800', '#fb8c00', '#f57c00', '#ef6c00', '#e65100'];
                break;
            case 'atomicRadius':
                min = 31; max = 298;
                colorScale = ['#e1f5fe', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b'];
                break;
            case 'electronAffinity':
                min = -222; max = 349;
                colorScale = ['#f3e5f5', '#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa', '#7b1fa2', '#6a1b9a', '#4a148c'];
                break;
            case 'meltingPoint':
                min = -272; max = 3422;
                colorScale = ['#fce4ec', '#f8bbd0', '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#d81b60', '#c2185b', '#ad1457', '#880e4f'];
                break;
            default:
                return '#e9ecef';
        }
        
        return this.interpolateColor(value, min, max, colorScale);
    }

    // 颜色插值
    interpolateColor(value, min, max, colorScale) {
        if (value < min) value = min;
        if (value > max) value = max;
        
        const ratio = (value - min) / (max - min);
        const index = Math.floor(ratio * (colorScale.length - 1));
        return colorScale[index];
    }

    // 显示元素详情
    showElementDetail(element) {
        const detailPanel = document.getElementById('elementDetail');
        const content = document.getElementById('detailContent');
        
        content.innerHTML = `
            <div class="detail-header">
                <div class="detail-symbol">${element.symbol}</div>
                <div class="detail-name">${element.name}</div>
                <div class="detail-number">原子序数: ${element.number}</div>
            </div>
            
            <div class="detail-section">
                <h3>电子排布</h3>
                <div class="electron-config">
                    <p><strong>电子排布式:</strong> ${element.electronConfig}</p>
                    <div class="electron-config-visual">
                        ${this.renderElectronConfigVisual(element)}
                    </div>
                    <p style="font-size: 12px; color: #666; margin-top: 10px;">
                        电子排布遵循构造原理：1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p → 5s → 4d → 5p → 6s → 4f → 5d → 6p → 7s → 5f → 6d → 7p
                    </p>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>化学性质</h3>
                <div class="properties-grid">
                    <div class="property-item">
                        <div class="property-label">电负性</div>
                        <div class="property-value">${element.electronegativity !== null ? element.electronegativity.toFixed(2) : 'N/A'}</div>
                    </div>
                    <div class="property-item">
                        <div class="property-label">稳定性</div>
                        <div class="property-value">${(element.stability * 100).toFixed(0)}%</div>
                    </div>
                    <div class="property-item">
                        <div class="property-label">放射性</div>
                        <div class="property-value">${element.radioactive ? '是 ☢' : '否'}</div>
                    </div>
                    <div class="property-item">
                        <div class="property-label">电离能</div>
                        <div class="property-value">${element.ionizationEnergy} kJ/mol</div>
                    </div>
                    <div class="property-item">
                        <div class="property-label">原子半径</div>
                        <div class="property-value">${element.atomicRadius} pm</div>
                    </div>
                    <div class="property-item">
                        <div class="property-label">电子亲和能</div>
                        <div class="property-value">${element.electronAffinity} kJ/mol</div>
                    </div>
                    <div class="property-item">
                        <div class="property-label">熔点</div>
                        <div class="property-value">${element.meltingPoint !== null ? element.meltingPoint.toFixed(1) + ' °C' : 'N/A'}</div>
                    </div>
                    <div class="property-item">
                        <div class="property-label">周期</div>
                        <div class="property-value">${element.period}</div>
                    </div>
                    <div class="property-item">
                        <div class="property-label">族</div>
                        <div class="property-value">${element.group !== null ? element.group : (element.isLanthanide ? '镧系' : element.isActinide ? '锕系' : 'N/A')}</div>
                    </div>
                </div>
            </div>
        `;
        
        detailPanel.classList.remove('hidden');
    }

    // 渲染电子排布可视化
    renderElectronConfigVisual(element) {
        let html = '';
        const superscripts = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹', '¹⁰', '¹¹', '¹²', '¹³', '¹⁴'];
        
        element.electronConfigDetailed.forEach((shell, shellIndex) => {
            const shellNumber = shellIndex + 1;
            const shellLabel = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'][shellIndex] || shellNumber;
            
            html += `<div class="electron-shell">
                <div class="shell-label">${shellLabel}层 (n=${shellNumber})</div>
                <div class="subshells">`;
            
            shell.subshells.forEach(subshell => {
                const electronSup = subshell.electrons > 0 ? superscripts[subshell.electrons] || subshell.electrons : '';
                const subshellLabel = `${shellNumber}${subshell.type}${electronSup}`;
                html += `<div class="subshell">${subshellLabel}</div>`;
            });
            
            html += `</div></div>`;
        });
        
        return html;
    }

    // 渲染图例
    renderLegends() {
        // 电负性图例
        this.renderColorScale('electronegativityScale', 0.7, 4.0, ['#e8f5e9', '#1b5e20']);
        
        // 稳定性图例
        this.renderColorScale('stabilityScale', 0, 1.0, ['#ffebee', '#b71c1c']);
        
        // 电离能图例
        this.renderColorScale('ionizationScale', 376, 2372, ['#fff3e0', '#e65100']);
        
        // 原子半径图例
        this.renderColorScale('radiusScale', 31, 298, ['#e1f5fe', '#01579b']);
        
        // 电子亲和能图例
        this.renderColorScale('affinityScale', -222, 349, ['#f3e5f5', '#4a148c']);
        
        // 熔点图例
        this.renderColorScale('meltingPointScale', -272, 3422, ['#fce4ec', '#880e4f']);
    }

    // 渲染颜色渐变条
    renderColorScale(elementId, min, max, colors) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const gradient = `linear-gradient(to right, ${colors[0]}, ${colors[1]})`;
        element.style.background = gradient;
    }

    // 更新激活的图例
    updateActiveLegend() {
        // 移除所有激活状态
        document.querySelectorAll('.legend-item').forEach(item => {
            item.classList.remove('active');
        });

        // 根据当前性质添加激活状态
        const propertyMap = {
            'electronegativity': 'electronegativityScale',
            'electronAffinity': 'affinityScale',
            'ionizationEnergy': 'ionizationScale',
            'atomicRadius': 'radiusScale',
            'meltingPoint': 'meltingPointScale',
            'stability': 'stabilityScale'
        };

        const scaleId = propertyMap[this.currentProperty];
        if (scaleId) {
            const scaleElement = document.getElementById(scaleId);
            if (scaleElement) {
                const legendItem = scaleElement.closest('.legend-item');
                if (legendItem) {
                    legendItem.classList.add('active');
                }
            }
        }
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new PeriodicTable();
});


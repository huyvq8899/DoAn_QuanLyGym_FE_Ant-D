import { BaoGia } from "../models/BaoGiaModel";
import { CuocVanChuyen } from "../models/CuocVanChuyen";
import { KhachHangTiemNang } from "../models/KhacHangTiemNang";
import { LaiXe } from "../models/LaiXe";

export class CloneData {
    //loaiDonHang: 0 - mua hàng; 1 - Mua hàng gửi ko
    public static listDonMuaHang: any[] = [
        {
            id: 1,
            maDonHang: 'MDH00001',
            loaiDonHang: 0,
            maKhachHang: 'KH00001',
            tenKhachHang: 'CÔNG TY CỔ PHẦN PHÁT TRIỂN VÀ ỨNG DỤNG PHẦN MỀM BÁCH KHOA',
            maSanPham: 'MSP00001',
            tenSanPham: 'Phần mềm Petrotimes'
        },
        {
            id: 2,
            maDonHang: 'MDH00002',
            loaiDonHang: 1,
            maKhachHang: 'KH00002',
            tenKhachHang: 'CÔNG TY CỔ PHẦN PHÁT TRIỂN VÀ ỨNG DỤNG PHẦN MỀM BÁCH KHOA',
            maSanPham: 'MSP00002',
            tenSanPham: 'Phần mềm kế toán Bách Khoa'
        },
        {
            id: 3,
            maDonHang: 'MDH00003',
            loaiDonHang: 0,
            maKhachHang: 'KH00003',
            tenKhachHang: 'CÔNG TY CỔ PHẦN PHÁT TRIỂN VÀ ỨNG DỤNG PHẦN MỀM BÁCH KHOA',
            maSanPham: 'MSP00003',
            tenSanPham: 'Phần mềm hóa đơn điện từ Bách Khoa'
        }
    ];
    public static listLaiXe: LaiXe[] = [
        {
            id: 1,
            tenGoi: 'Xe Quyết',
            bienKiemSoat: '34L-6784',
            tenLaiXe: 'Tạ Vă Quyết',
            cmt: '142440868',
            soDienThoai: '0978205662',
            tongDungTich: 13465,
            chiTietKhoangHam: [
                {
                    id: 1,
                    dungTich: 4543,
                    parentId: 1,
                },
                {
                    id: 2,
                    dungTich: 4389,
                    parentId: 1,
                },
                {
                    id: 3,
                    dungTich: 4533,
                    parentId: 1,
                }
            ],
        },
        {
            id: 2,
            tenGoi: 'Xe Trượng',
            bienKiemSoat: '15C-227.82',
            tenLaiXe: 'Phạm Văn Trượng',
            cmt: '031083005506',
            soDienThoai: '0343871788',
            tongDungTich: 21135,
            chiTietKhoangHam: [
                {
                    id: 1,
                    dungTich: 6095,
                    parentId: 2,
                },
                {
                    id: 2,
                    dungTich: 6050,
                    parentId: 2,
                },
                {
                    id: 3,
                    dungTich: 6000,
                    parentId: 2,
                },
                {
                    id: 4,
                    dungTich: 2990,
                    parentId: 2,
                }
            ],
        },
    ];

    public static listCuocVanChuyen: CuocVanChuyen[] = [
        {
            id: 1,
            tinhThanhPho: 'Thành phố Hà Nội',
            quanHuyen: 'Quận Ba Đình',
            maVanChuyen: 'HNQBD',
            cuocVanChuyen: 200
        },
        {
            id: 2,
            tinhThanhPho: 'Thành phố Hà Nội',
            quanHuyen: 'Quận Hoàn Kiếm',
            maVanChuyen: 'HNQHK',
            cuocVanChuyen: 300
        },
        {
            id: 3,
            tinhThanhPho: 'Thành phố Hà Nội',
            quanHuyen: 'Quận Tây Hồ',
            maVanChuyen: 'HNQTH',
            cuocVanChuyen: 400
        },
        {
            id: 4,
            tinhThanhPho: 'Thành phố Hà Nội',
            quanHuyen: 'Quận Long Biên',
            maVanChuyen: 'HNQLB',
            cuocVanChuyen: 500
        }
    ];

    public static listBaoGia: BaoGia[] = [
        {
            id: 1,
            xuatPhat: 'Hải phòng',
            diemDen: 'Yên bái',
            cuocXe: 480,
            phiCang: ''
        },
        {
            id: 2,
            xuatPhat: 'Hải phòng',
            diemDen: 'Thái Bình',
            cuocXe: 200,
            phiCang: 'Hải Phòng - Tiên lãng (80), Tiên lãng - Thái Bình (120)'
        },
        {
            id: 3,
            xuatPhat: 'Hải phòng',
            diemDen: 'Cà Mau',
            cuocXe: 600,
            phiCang: ''
        },
        {
            id: 4,
            xuatPhat: 'Hải phòng',
            diemDen: 'Hà Nội',
            cuocXe: 360,
            phiCang: ''
        },
    ]
}